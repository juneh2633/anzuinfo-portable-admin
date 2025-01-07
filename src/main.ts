import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpErrorFilter } from './common/filter/HttpErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('anzuinfo-p')
    .setDescription('anzuinfo api document')
    .addTag('anzuinfo')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: [
      'https://p.eagate.573.jp',
      'http://localhost:3000',
      'https://juneh2633.ddns.net',
    ],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
