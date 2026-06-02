import { NestFactory } from '@nestjs/core';
import { ValidationPipe,BadRequestException } from '@nestjs/common'; // <-- Importa esto
import { AppModule } from './app.module';

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
app.enableCors();
  await app.listen(3000);
}
bootstrap();
