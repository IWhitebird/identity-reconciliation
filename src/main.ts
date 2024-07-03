import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  const config = new DocumentBuilder()
    .setTitle('API DOCS')
    .addTag('Identity-Reconciliation')
    .build();
  await SwaggerModule.loadPluginMetadata(metadata);    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
  Logger.log(`Api docs running on http://localhost:3000/api`, 'Bootstrap')
}
bootstrap();