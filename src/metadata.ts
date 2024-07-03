/* eslint-disable */
export default async () => {
    const t = {
        ["./contact/dto/contact.dto"]: await import("./contact/dto/contact.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./contact/dto/contact.dto"), { "CreateContactDto": { email: { required: false, type: () => String }, phoneNumber: { required: false, type: () => Number } }, "CreateContactResponseDto": { contact: { required: true, type: () => t["./contact/dto/contact.dto"].Contact } }, "Contact": { primaryContactId: { required: true, type: () => Number }, emails: { required: true, type: () => [String] }, phoneNumbers: { required: true, type: () => [String] }, secondaryContactIds: { required: true, type: () => [Number] } } }]], "controllers": [[import("./contact/contact.controller"), { "ContactController": { "getContacts": {}, "createContact": {} } }]] } };
};