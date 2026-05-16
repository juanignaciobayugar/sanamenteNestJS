import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts') // Ruta base: http://localhost:3000/contacts
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // 1. Crear un mensaje de contacto
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  // 2. Obtener todos los contactos mapeados con nombre y email
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  // 3. Obtener un solo contacto por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.findOne(id);
  }

  // 4. Editar un contacto por ID
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  // 5. Eliminar un contacto por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.remove(id);
  }
}
