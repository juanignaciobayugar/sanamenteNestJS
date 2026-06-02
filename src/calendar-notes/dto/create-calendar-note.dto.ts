import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCalendarNoteDto {
  @IsString({ message: 'El contenido de la actividad es obligatorio' })
  @IsNotEmpty({ message: 'El contenido no puede estar vacío' })
  contenido: string; // <--- Cambiado de 'actividad' a 'contenido'

  @IsString({ message: 'La fecha es obligatoria' })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  date: string; // <--- Cambiado de 'fecha' a 'date' (NestJS/TypeORM lo convierte a fecha solo)

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora debe tener el formato HH:MM (24hs)' })
  @IsNotEmpty({ message: 'La hora de la agenda es obligatoria' })
  creado_en: string; 
}