import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateContactDto, CreateContactResponseDto } from './dto/contact.dto';
import { linkPrecedence } from '@prisma/client';
import moment from 'moment';

@Injectable()
export class ContactService {
    constructor(private readonly prismaService: PrismaService) { }

    async getContacts() {
        return this.prismaService.contact.findMany();
    }

    async createContact(data: CreateContactDto): Promise<CreateContactResponseDto> {
        try {
            const contact = await this.prismaService.contact.findMany({
                where: {
                    OR:
                        [
                            {
                                email: data.email
                            },
                            {
                                phoneNumber: data.phoneNumber.toString()
                            }
                        ]
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });

            //Not Existing ? Create new and return
            if (contact.length === 0) {
                const newContact = await this.prismaService.contact.create({
                    data: {
                        email: data.email,
                        phoneNumber: data.phoneNumber.toString()
                    }
                });
                return {
                    contact: {
                        primaryContactId: newContact.id,
                        emails: [newContact.email],
                        phoneNumbers: [newContact.phoneNumber],
                        secondaryContactIds: []
                    }
                }
            }

            /*
                **Kind of Transivity Property**
                If Primary Contact is undefined, we can assume that it is releted like this : 
                P(a ,b) -> S(c , b) -> S(c , d)
                Fetch all the primary Contracts and releted secondary contacts
            */

            const AllContactsTree =
                await this.prismaService.contact.findMany({
                    where: {
                        OR: [
                            {
                                linkedId: {
                                    in: [
                                        ...contact.filter(c => c.linkedId).map(c => c.linkedId) ,
                                        ...contact.filter(c => c.id).map(c => c.id)
                                     ]
                                }
                            },
                            {
                                id: {
                                    in: [
                                        ...contact.filter(c => c.linkedId).map(c => c.linkedId) ,
                                        ...contact.filter(c => c.id).map(c => c.id)
                                     ]
                                }
                            },

                        ]
                    }
                });
            // console.log(AllContactsTree)
            /*
                Determine Real Primary Contact if there are multiple primary 
                contacts get one with the oldest created date
            */
            let primaryContact = undefined;

            let emailExist = false;
            let phoneNumberExist = false;

            for (const ct of AllContactsTree) {
                if (ct.linkPrecedence === linkPrecedence.primary &&
                    (
                        primaryContact === undefined ||
                        moment(ct.createdAt).isBefore(moment(primaryContact.createdAt))
                    )) {
                    primaryContact = ct;
                }
                if(data.email !== undefined && ct.email === data.email) emailExist = true;
                console.log(ct.phoneNumber , data.phoneNumber.toString() , ct.phoneNumber === data.phoneNumber.toString())
                if(data.phoneNumber !== undefined && ct.phoneNumber === data.phoneNumber.toString()) phoneNumberExist = true;
            }

            //We got new Data
            let needNewContact = !emailExist || !phoneNumberExist;

            //Update the States
            let transaction = [];
            if (needNewContact) {
                transaction.push(
                    this.prismaService.contact.create({
                        data: {
                            email: data.email,
                            phoneNumber: data.phoneNumber.toString(),
                            linkPrecedence: linkPrecedence.secondary,
                            linkedId: primaryContact.id
                        }
                    })
                );
            }

            for (let ct of AllContactsTree) {
                if (ct.id !== primaryContact.id && ct.linkPrecedence === linkPrecedence.primary) {
                    transaction.push(
                        this.prismaService.contact.update({
                            where: {
                                id: ct.id
                            },
                            data: {
                                linkPrecedence: linkPrecedence.secondary,
                                linkedId: primaryContact.id
                            }
                        })
                    );
                    ct.linkPrecedence = linkPrecedence.secondary;
                    ct.linkedId = primaryContact.id;
                }
            }

            if (transaction.length !== 0) {
                var res = await this.prismaService.$transaction(transaction);
            }

            return {
                contact: {
                    primaryContactId: primaryContact.id,
                    emails: 
                    [
                        primaryContact.email,
                        ...(AllContactsTree.filter(c => c.id !== primaryContact.id).map(c => c.email)),
                        ...(needNewContact && res && res.length > 0) ? [res[0].email] : []
                    ],
                    phoneNumbers:
                    [
                        primaryContact.phoneNumber,
                        ...(AllContactsTree.filter(c => c.id !== primaryContact.id).map(c => c.phoneNumber)),
                        ...(needNewContact && res && res.length > 0) ? [res[0].phoneNumber] : []
                    ],
                    secondaryContactIds: [
                        ...(AllContactsTree.filter(c => c.id !== primaryContact.id).map(c => c.id)),
                        ...(needNewContact && res && res.length > 0) ? [res[0].id] : []
                    ]
                }
            }
        } catch (e) {
            console.log(e);
            return e
        }

    }
}
