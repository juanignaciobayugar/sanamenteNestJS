import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

@UseGuards(AuthGuard('jwt')) // 🔒 Este guard obliga a que manden el token
  @Get('perfil')
  async obtenerPerfilConMensajes(@Request() req) {
    // NestJS decodifica el JWT y te inyecta los datos en req.user
    const usuarioId = req.user.userId; // O req.user.sub, según cómo lo guarde tu JwtStrategy

    // Aquí llamarías a un servicio para buscar los mensajes de este usuario específico
    // Ejemplo ficticio:
    // const datosCompletos = await this.usersService.obtenerTodoElPerfil(usuarioId);
    
    return {
      message: "¡Acceso concedido!",
      usuarioId: usuarioId,
      nombre: "Juan", // Esto vendría de tu base de datos
      mensajes: [
        { id: 1, texto: "Hola, este es mi primer mensaje en la web" },
        { id: 2, texto: "NestJS con MySQL es genial" }
      ]
    };
  }

}
