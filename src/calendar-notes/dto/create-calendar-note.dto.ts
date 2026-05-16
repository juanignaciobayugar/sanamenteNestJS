import { IsDateString, IsNotEmpty, IsString, IsInt, Matches} from 'class-validator';

export class CreateCalendarNoteDto {
  @IsDateString() // Valida formato YYYY-MM-DD
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'El contenido de la nota no puede estar vacío' })
  contenido: string;

// Validamos que manden la hora en formato HH:MM (ej: 15:45 o 08:30)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La hora debe tener el formato HH:MM (24hs)' })
  @IsNotEmpty({ message: 'La hora de la agenda es obligatoria' })
  creado_en: string;


  @IsInt({ message: 'El id_usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  id_usuario: number;
}