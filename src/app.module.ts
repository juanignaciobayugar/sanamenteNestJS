import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // o 'postgres'
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Sanamente',
      entities: [User], // Importante: registrar la entidad aquí
      synchronize: false, // ¡CUIDADO! Solo para desarrollo, crea las tablas solo
    }),
    UsersModule,
  ],
})
export class AppModule {}