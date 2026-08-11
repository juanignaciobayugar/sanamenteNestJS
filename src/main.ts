import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
    origin: [
      'https://www.bayadisenio.com.ar',
      'https://bayadisenio.com.ar',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
     whitelist: true,
    forbidNonWhitelisted: true,}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
