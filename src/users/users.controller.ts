import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Esto significa que la URL será: localhost:3000/users
export class UsersController {
  
  // Aquí "inyectamos" el servicio para poder usarlo
  constructor(private readonly usersService: UsersService) {}

  @Post() // Escucha peticiones POST (Crear)
  create(@Body() createUserDto: CreateUserDto) {
    // Le pasamos el paquete (DTO) al chef (Servicio)
    return this.usersService.create(createUserDto);
  }

  @Get() // Escucha peticiones GET (Leer todos)
  findAll() {
    return this.usersService.findAll();
  }
}