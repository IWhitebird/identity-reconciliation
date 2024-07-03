import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService, PrismaService],
})
export class CustomerModule { }
