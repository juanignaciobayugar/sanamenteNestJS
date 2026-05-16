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

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // 1. CREAR UNA NOTA
  async create(createCalendarNoteDto: CreateCalendarNoteDto) {
    const { id_usuario, ...noteData } = createCalendarNoteDto;

    // Validamos primero si el usuario existe en la base de datos
    const user = await this.userRepository.findOneBy({ id: id_usuario });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }

    // Creamos la instancia vinculándole el usuario que encontramos
    const newNote = this.calendarNoteRepository.create({
      ...noteData,
      creadoEn: noteData.creado_en,
      usuario: user,
    });

    return await this.calendarNoteRepository.save(newNote);
  }

  // 2. OBTENER TODAS LAS NOTAS
  async findAll() {
    return await this.calendarNoteRepository.find({
      relations: ['usuario'], // Esto hace un JOIN para traerte los datos del usuario dueño de la nota
    });
  }

  // 3. OBTENER UNA NOTA POR ID
  async findOne(id: number) {
    const note = await this.calendarNoteRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!note) {
      throw new NotFoundException(`Nota de calendario con ID ${id} no encontrada`);
    }
    return note;
  }

  // 4. MODIFICAR UNA NOTA (PATCH)
  async update(id: number, updateCalendarNoteDto: UpdateCalendarNoteDto) {
    const note = await this.findOne(id); // Reutilizamos findOne para verificar si existe

    const { id_usuario, ...noteData } = updateCalendarNoteDto;

    // Si en el PATCH nos mandan un nuevo id_usuario, validamos que exista
    if (id_usuario) {
      const user = await this.userRepository.findOneBy({ id: id_usuario });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
      }
      note.usuario = user;
    }
    if (updateCalendarNoteDto.creado_en) {
      note.creadoEn = updateCalendarNoteDto.creado_en;
    }
    // Fusionamos los datos nuevos sobre la nota que ya teníamos
    this.calendarNoteRepository.merge(note, noteData);
    return await this.calendarNoteRepository.save(note);
  }

  // 5. ELIMINAR UNA NOTA
  async remove(id: number) {
    const note = await this.findOne(id);
    await this.calendarNoteRepository.remove(note);
    return { message: `Nota con ID ${id} eliminada correctamente` };
  }
}