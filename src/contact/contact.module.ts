import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [ContactController],
    providers: [ContactService, PrismaService],
})
export class ContactModule { }
