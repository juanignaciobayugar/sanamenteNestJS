import { NestFactory } from '@nestjs/core';
import { ValidationPipe,BadRequestException } from '@nestjs/common'; // <-- Importa esto
import { AppModule } from './app.module';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ESTA ES LA LÍNEA QUE FALTA:
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina campos que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si envían campos extra
    transform: true, // Convierte los tipos (ej: string a number) automáticamente
    exceptionFactory: (errors) => {
      console.log('🚨 ERRORES DE VALIDACIÓN EN EL BACKEND:', JSON.stringify(errors, null, 2));
      return new BadRequestException(errors);
    },
  }));
app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://sanamente-oqok.onrender.com', // Tu frontend en Render
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // 2. OBLIGATORIO PARA RENDER: Usar el puerto dinámico y '0.0.0.0'
  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0'); 
  console.log(`Servidor escuchando en el puerto ${port}`);
}
bootstrap();
