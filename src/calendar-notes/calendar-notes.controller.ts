import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CalendarNotesService } from './calendar-notes.service';
import { CreateCalendarNoteDto } from './dto/create-calendar-note.dto';
import { UpdateCalendarNoteDto } from './dto/update-calendar-note.dto';

@Controller('calendar-notes') // Esto define la ruta base: http://localhost:3000/calendar-notes
export class CalendarNotesController {
  constructor(private readonly calendarNotesService: CalendarNotesService) {}

  // 1. Crear una nota
  @Post()
  create(@Body() createCalendarNoteDto: CreateCalendarNoteDto) {
    return this.calendarNotesService.create(createCalendarNoteDto);
  }

  // 2. Traer todas las notas
  @Get()
  findAll() {
    return this.calendarNotesService.findAll();
  }

  // 3. Traer una nota por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.calendarNotesService.findOne(id);
  }

  // 4. Actualizar una nota por ID
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCalendarNoteDto: UpdateCalendarNoteDto) {
    return this.calendarNotesService.update(id, updateCalendarNoteDto);
  }

  // 5. Borrar una nota por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.calendarNotesService.remove(id);
  }
}