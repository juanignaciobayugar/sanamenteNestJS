import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,Req } from '@nestjs/common';
import { CalendarNotesService } from './calendar-notes.service';
import { CreateCalendarNoteDto } from './dto/create-calendar-note.dto';
import { UpdateCalendarNoteDto } from './dto/update-calendar-note.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('calendar-notes')
export class CalendarNotesController {
  constructor(private readonly calendarNotesService: CalendarNotesService) {}

  // 1. Crear una nota
  @Post()
  async create(@Body() createCalendarNoteDto: CreateCalendarNoteDto, @Req() req: any) {
    const userId = req.user.sub; 

    // 🔍 AGREGÁ ESTA LÍNEA ACÁ PARA INVESTIGAR:
    console.log('********* EL ID QUE VIENE EN EL REQ.USER ES:', req.user);
    return this.calendarNotesService.create(createCalendarNoteDto, userId);
  }

  // 2. Traer todas las notas del usuario logueado
  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.sub;
    return this.calendarNotesService.findAllByUser(userId);
  }

  // 3. Traer una nota por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.sub;
    return this.calendarNotesService.findOne(id, userId);
  }

  // 4. Actualizar una nota por ID
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateCalendarNoteDto: UpdateCalendarNoteDto,
    @Req() req: any
  ) {
    const userId = req.user.sub;
    return this.calendarNotesService.update(id, updateCalendarNoteDto, userId);
  }

  // 5. Borrar una nota por ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.sub;
    return this.calendarNotesService.remove(id, userId);
  }
}