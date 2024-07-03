import { ContactModule } from './contact/contact.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    ContactModule,
  ],
  providers: [PrismaService]
})
export class AppModule { }
