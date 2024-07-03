import { CustomerModule } from './customer/customer.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    CustomerModule,
  ],
  providers: [PrismaService]
})
export class AppModule { }
