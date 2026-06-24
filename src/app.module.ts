import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DailyRecordsModule } from './daily-records/daily-records.module';
import { DailyRecord } from './daily-records/entities/daily-record.entity';
import { CalendarNotesModule } from './calendar-notes/calendar-notes.module';
import { CalendarNote } from './calendar-notes/entities/calendar-note.entity';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/entities/contact.entity';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './StatisticsModule/statistics.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
type: 'mysql',
  url: 'mysql://root:QLlLYWEcNYlwShFCNQMkiQliTRlmPaRI@switchyard.proxy.rlwy.net:41212/railway',

      entities: [User, DailyRecord, CalendarNote, Contact,], // Importante: registrar la entidad aquí
      dropSchema: false, // Esto borra y recrea la base de datos cada vez que inicias la app, útil para desarrollo pero peligroso en producción
      synchronize: false, // ¡CUIDADO! Solo para desarrollo, crea las tablas solo
    }),
    UsersModule,
    DailyRecordsModule,
    CalendarNotesModule,
    ContactsModule,
    AuthModule,
    StatisticsModule,
  ],
})
export class AppModule { }