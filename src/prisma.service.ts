import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async Init() {
    try {
      await this.$connect();
    } catch (e) {
      console.log(e);
    }
  }
}
