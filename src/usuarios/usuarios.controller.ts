import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios') // La URL será: http://localhost:3000/usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Recibe el formulario enviado desde la página web
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // Te permite consultar la lista de cargados
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
}