import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { User } from '../users/entities/user.entity'; // Ajustá la ruta a tu entidad User

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}