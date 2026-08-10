import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // Disponible en todo el proyecto sin reimportar
    }),
    TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Usamos la cadena de conexión completa de Neon
  entities: [Usuario],
  synchronize: true, // Crea las tablas automáticamente en Neon
  ssl: {
    rejectUnauthorized: false, // Obligatorio para Neon y conexiones SSL en serverless
  },
}),UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
