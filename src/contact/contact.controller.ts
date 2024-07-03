import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('contact')    
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService : ContactService) {}

    @Get()
    async getContacts(@Res() reply : FastifyReply) {
        return reply.status(200).send(await this.contactService.getContacts());
    }

    @Post('identify')
    async createContact(@Res() reply : FastifyReply, @Body()  createContactDto : CreateContactDto) {
        return reply.status(200).send(await this.contactService.createContact(createContactDto));
    }

}
