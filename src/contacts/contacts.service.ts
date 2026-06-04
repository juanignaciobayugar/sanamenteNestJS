import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const { nombreCompleto, email, mensaje, usuarioId } = createContactDto;

      // Creamos la estructura del nuevo contacto
      const nuevoContacto = this.contactRepository.create({
        nombreCompleto,
        email,
        mensaje,
        // Si hay un usuario logueado asignamos su ID, de lo contrario queda como null
        usuario:usuarioId ? { id: usuarioId } : null,
      });

      // Guardamos en la base de datos de manera asíncrona
      return await this.contactRepository.save(nuevoContacto);
    } catch (error) {
      // Manejo de errores por si falla la conexión o la consulta a MySQL
      throw new InternalServerErrorException('Error al registrar el mensaje de contacto');
    }
  }
}
