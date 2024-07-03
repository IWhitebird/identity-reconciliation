import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
    constructor(private readonly prismaService: PrismaService) {}

    async getCustomers() {
        return this.prismaService.customer.findMany();
    }

    async createCustomer(data : CreateCustomerDto) {
        return data
    }
}
