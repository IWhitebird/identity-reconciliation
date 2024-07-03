import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsOptional()
    email?: string;

    @IsNumber()
    @IsOptional() 
    phoneNo?: number;
}