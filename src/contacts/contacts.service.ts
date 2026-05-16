import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 1. CREAR UN MENSAJE DE CONTACTO
  async create(createContactDto: CreateContactDto) {
    const { id_usuario, ...contactData } = createContactDto;

    // Buscamos si el usuario existe en el sistema
    const user = await this.userRepository.findOneBy({ id: id_usuario });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }

    const newContact = this.contactRepository.create({
      ...contactData,
      usuario: user,
    });

    return await this.contactRepository.save(newContact);
  }

  // 2. OBTENER TODOS LOS CONTACTOS (Formateado con nombre y mail directo)
  async findAll() {
    const contacts = await this.contactRepository.find({
      relations: ['usuario'], // Hacemos el JOIN para sacar la info del usuario
    });

    // Mapeamos para devolver el formato limpio que necesitás ver en el front
    return contacts.map(contact => ({
      id: contact.id,
      date: contact.date,
      mensaje: contact.mensaje,
      id_usuario: contact.usuario ? contact.usuario.id : null,
      nombre_usuario: contact.usuario ? contact.usuario.name : null, // Nombre del user
      email_usuario: contact.usuario ? contact.usuario.email : null, // Email del user
    }));
  }

  // 3. OBTENER UN SOLO CONTACTO POR ID
  async findOne(id: number) {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!contact) {
      throw new NotFoundException(`Mensaje de contacto con ID ${id} no encontrado`);
    }

    return {
      id: contact.id,
      date: contact.date,
      mensaje: contact.mensaje,
      id_usuario: contact.usuario ? contact.usuario.id : null,
      nombre_usuario: contact.usuario ? contact.usuario.name : null,
      email_usuario: contact.usuario ? contact.usuario.email : null,
    };
  }

  // 4. ACTUALIZAR UN CONTACTO
  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) {
      throw new NotFoundException(`Mensaje de contacto con ID ${id} no encontrado`);
    }

    if (updateContactDto.id_usuario) {
      const user = await this.userRepository.findOneBy({ id: updateContactDto.id_usuario });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${updateContactDto.id_usuario} no encontrado`);
      }
      contact.usuario = user;
    }

    this.contactRepository.merge(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  // 5. ELIMINAR UN CONTACTO
  async remove(id: number) {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) {
      throw new NotFoundException(`Mensaje de contacto con ID ${id} no encontrado`);
    }
    await this.contactRepository.remove(contact);
    return { message: `Mensaje de contacto con ID ${id} eliminado correctamente` };
  }
}