import { Body, Controller, HttpCode, HttpStatus, Post,NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from '../users/users.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly usersService: UsersService,) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

@UseGuards(AuthGuard('jwt')) 
@Get('perfil')
async obtenerPerfilConMensajes(@Request() req) {
  // 1. El ID real (1) que acabamos de ver en Postman viene acá adentro:
  const usuarioId = req.user.userId; 

  // 2. Buscamos al usuario real en la Base de Datos usando tu servicio existente
  // (Asegurate de tener "usersService" inyectado en el constructor de este controlador)
  const usuarioReal = await this.usersService.findOne(usuarioId); 
  
  if (!usuarioReal) {
    throw new NotFoundException('Usuario no encontrado en la base de datos');
  }
 // Extraemos 'password' y guardamos todo el resto en 'usuarioSinPassword'
  const { password, ...usuarioSinPassword } = usuarioReal;
  // 3. Devolvemos el JSON adaptado con lo que vos necesitás en React
  return {
    message: "¡Acceso concedido!",
    usuarioId: usuarioId,
    nombreCompleto: usuarioReal.name || "Sin nombre registrado", // El campo 'name' de tu BD
    email: usuarioReal.email,                                    // El campo 'email' de tu BD
    mensajes: [
      { id: 1, texto: "Hola, este es mi primer mensaje en la web" },
      { id: 2, texto: "NestJS con MySQL es genial" }
    ]
  };
}

}
