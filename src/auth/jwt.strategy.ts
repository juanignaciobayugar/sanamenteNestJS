import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants'; // <-- Asegurate de que la ruta a tus constantes sea correcta

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Le decimos a NestJS que extraiga el token del header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Controlamos que si el token expiró, rechace la petición automáticamente
      ignoreExpiration: false,
      // 3. Le pasamos la clave secreta para desencriptar y verificar la firma del token
      secretOrKey: jwtConstants.secret,
    });
  }

  // 4. Este método se ejecuta AUTOMÁTICAMENTE si el token es válido y real
  async validate(payload: any) {
    // El 'payload' es el JSON que vos guardaste dentro del token en tu AuthService (cuando hiciste login).
    // Lo que retornes acá es lo que NestJS va a inyectar mágicamente en el "req.user" de tu controlador.
    
    // NOTA: Si en tu login guardaste el ID del usuario como 'sub' (estándar de JWT), lo recuperamos así:
    return { 
      userId: payload.sub, // <-- Asegurate de que este campo coincida con lo que guardaste en el token
      email: payload.username // <-- Si guardaste el email o username, también lo podés recuperar aquí 
    };
  }
}