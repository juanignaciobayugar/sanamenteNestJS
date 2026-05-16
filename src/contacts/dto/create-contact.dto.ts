import { IsDateString, IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsDateString() // Valida formato YYYY-MM-DD
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'El mensaje de contacto no puede estar vacío' })
  @MaxLength(255, { message: 'El mensaje no puede superar los 255 caracteres' })
  mensaje: string;

  @IsInt({ message: 'El id_usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  id_usuario: number;
}