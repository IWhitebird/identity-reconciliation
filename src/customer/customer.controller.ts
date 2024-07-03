import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/customer.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('customer')    
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService) {}

    @Get()
    async getCustomers() {
        return this.customerService.getCustomers();
    }

    @Post()
    async createCustomer(@Body()  createCustomerDto : CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

}
