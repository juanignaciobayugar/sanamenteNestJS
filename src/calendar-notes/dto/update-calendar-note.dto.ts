import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarNoteDto } from './create-calendar-note.dto';

export class UpdateCalendarNoteDto extends PartialType(CreateCalendarNoteDto) {}