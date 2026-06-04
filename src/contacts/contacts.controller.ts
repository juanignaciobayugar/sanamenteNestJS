import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacto') // Define la ruta base: http://localhost:3000/contacto
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Devuelve un estado 201 Created si todo sale bien
  async registrarContacto(@Body() createContactDto: CreateContactDto) {
    // NestJS valida automáticamente el DTO antes de entrar acá gracias al ValidationPipe
    const nuevoContacto = await this.contactsService.create(createContactDto);
    
    return {
      success: true,
      message: 'Mensaje de contacto enviado con éxito',
      data: nuevoContacto,
    };
  }
}
