import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarNotesService } from './calendar-notes.service';
import { CalendarNotesController } from './calendar-notes.controller';
import { CalendarNote } from './entities/calendar-note.entity';
import { User } from '../users/entities/user.entity'; // Ajustá la ruta si cambia

@Module({
  imports: [TypeOrmModule.forFeature([CalendarNote, User])],
  controllers: [CalendarNotesController],
  providers: [CalendarNotesService],
})
export class CalendarNotesModule {}