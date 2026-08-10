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
      type: 'mysql',
      host: process.env.DB_HOST,       // Dirección del servidor MySQL
      port: Number(process.env.DB_PORT),              // Puerto por defecto de MySQL
      username: process.env.DB_USER,        // Tu usuario de MySQL
      password: process.env.DB_PASSWORD, // Tu contraseña de MySQL
      database: process.env.DB_NAME,   // Nombre de la base de datos que creaste
      entities: [Usuario],
      synchronize: true,       // ⚠️ Crea la tabla automáticamente si no existe (ideal para dev)
    }),UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
