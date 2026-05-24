import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

async signIn(email: string, pass: string): Promise<any> { // Cambiado 'usern' por 'email'
  const user = await this.usersService.findOne(email);
  
console.log('======= DEBUG AUTHENTICATION =======');
  console.log('1. Lo que viene de Postman -> Email:', email, '| Pass:', pass);
  console.log('2. Lo que trajo la Base de Datos ->', user);
  if (user) {
    console.log('3. ¿Coinciden las contraseñas exactamente? ->', user.password === pass);
  } else {
    console.log('3. Error -> No se encontró ningún usuario con ese email.');
  }
  console.log('====================================');



  if (user?.password !== pass) {
    throw new UnauthorizedException();
  }

  const payload = { username: user.email, sub: user.id };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}
}