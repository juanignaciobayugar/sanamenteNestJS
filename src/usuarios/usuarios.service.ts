import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly configService: ConfigService,
  ) {
    // Configuración del envío de correo con Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // 👈 Pone tu dirección de Gmail completa
        pass: process.env.GMAIL_PASS,  // 👈 La contraseña de aplicación que acabas de generar
      },
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      // 1. Guardar en la base de datos MySQL
      const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
      const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

      // 2. Enviar notificación por correo
      await this.enviarNotificacionEmail(usuarioGuardado);

      return usuarioGuardado;
    } catch (error:any) {
      if (error.code === 'ER_DUP_ENTRY' || error.number === 1062) {
        throw new ConflictException('El correo electrónico ya se encuentra registrado');
      }
      this.logger.error('Error en el servicio de usuarios:', error);
      throw new InternalServerErrorException('Error al procesar la solicitud');
    }
  }

  private async enviarNotificacionEmail(usuario: Usuario): Promise<void> {
    const { nombre, email, actividad, telefono } = usuario;

    const mensajeTexto = `te ah escrito ${nombre}, con el email ${email}, que se dedica a ${actividad} y su telefono es ${telefono}.`;

    try {
      await this.transporter.sendMail({
        from: '"Formulario Web" <' + process.env.GMAIL_USER + '>', // Pone tu correo de Gmail
        to: process.env.GMAIL_USER,                      // Pone tu correo donde querés recibir el aviso
        subject: `Nuevo mensaje de contacto de ${nombre}`,
        text: mensajeTexto,
      });

      this.logger.log(`Notificación enviada a Gmail sobre el contacto: ${email}`);
    } catch (error:any) {
      this.logger.error('Error al enviar el correo:', error);
    }
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
}