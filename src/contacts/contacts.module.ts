import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [
    // Registramos la entidad para que el Repository pueda ser inyectado en el Service
    TypeOrmModule.forFeature([Contact])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}