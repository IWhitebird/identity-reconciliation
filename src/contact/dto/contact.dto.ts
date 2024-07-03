import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional() 
    @IsNumber()
    phoneNumber?: number;
}

// return {
//     contact : {
//         primaryContatctId:// number, 
//         emails: //string[], // first element being email of primary contact
//         phoneNumbers:// string[], // first element being phoneNumber of primary conta
//         secondaryContactIds: //number[] // Array of all Contact IDs that are "seconda
//      }
// }

export class CreateContactResponseDto {
    contact: Contact;
}

export class Contact {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
}
