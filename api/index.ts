import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common'; // <-- Agregado
import { AppModule } from '../src/app.module';
import express from 'express';

const server = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  // Habilitar CORS
  app.enableCors({
    origin: '*', // O la URL de tu React
    credentials: true,
  });

  // Habilitar las validaciones globales (como en tu main.ts)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.init();
};

createNestServer(server);

export default server;