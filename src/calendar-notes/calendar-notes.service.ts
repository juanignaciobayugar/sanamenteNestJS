import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarNote } from './entities/calendar-note.entity';
import { CreateCalendarNoteDto } from './dto/create-calendar-note.dto';
import { UpdateCalendarNoteDto } from './dto/update-calendar-note.dto';
import { User } from '../users/entities/user.entity'; // Ajustá la ruta si tus carpetas difieren

@Injectable()
export class CalendarNotesService {
  constructor(
    @InjectRepository(CalendarNote)
    private readonly calendarNoteRepository: Repository<CalendarNote>,
  ) {}

  // 1. CREAR UNA NOTA (Vinculada al usuario del token)
  async create(createCalendarNoteDto: CreateCalendarNoteDto, userId: number) {
    const { creado_en, ...noteData } = createCalendarNoteDto;

    const newNote = this.calendarNoteRepository.create({
      ...noteData,
      creadoEn: creado_en, // Mapeamos el campo del DTO a tu entidad
      usuario: { id: userId }, // Relación directa usando el ID del token
    });

    return await this.calendarNoteRepository.save(newNote);
  }

  // 2. OBTENER TODAS LAS NOTAS (Únicamente del usuario logueado)
  async findAllByUser(userId: number) {
    return await this.calendarNoteRepository.find({
      where: { usuario: { id: userId } },
      order: { creadoEn: 'ASC' }, // Te las devuelve ordenadas por hora
    });
  }

  // 3. OBTENER UNA NOTA POR ID (Solo si pertenece al usuario logueado)
  async findOne(id: number, userId: number) {
    const note = await this.calendarNoteRepository.findOne({
      where: { id, usuario: { id: userId } },
    });

    if (!note) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada o no tienes permisos`);
    }

    return note;
  }

  // 4. MODIFICAR UNA NOTA (Asegurando propiedad antes de editar)
  async update(id: number, updateCalendarNoteDto: UpdateCalendarNoteDto, userId: number) {
    // Reutiliza findOne. Si no es del usuario, frena acá con un 404/403 automáticamente
    const note = await this.findOne(id, userId); 

    const { creado_en, ...noteData } = updateCalendarNoteDto;

    if (creado_en) {
      note.creadoEn = creado_en;
    }

    // Fusionamos los cambios en la entidad que encontramos
    this.calendarNoteRepository.merge(note, noteData);
    return await this.calendarNoteRepository.save(note);
  }

  // 5. ELIMINAR UNA NOTA (Asegurando propiedad antes de borrar)
  async remove(id: number, userId: number) {
    // Reutiliza findOne para asegurar que sea suya antes de borrar de la base de datos
    const note = await this.findOne(id, userId); 
    
    await this.calendarNoteRepository.remove(note);
    return { message: `Nota con ID ${id} eliminada correctamente` };
  }
}