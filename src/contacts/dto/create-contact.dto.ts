import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt, Length } from 'class-validator';

export class CreateContactDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @Length(3, 150, { message: 'El nombre debe tener entre 3 y 150 caracteres' })
  nombreCompleto: string;

  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @Length(5, 150, { message: 'El email no puede superar los 150 caracteres' })
  email: string;

  @IsString({ message: 'El mensaje debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El mensaje no puede estar vacío' })
  mensaje: string;

  // Como es la Opción 1 (Híbrida), este campo es Opcional.
  // Si en React el usuario no está logueado, no lo mandás y listo.
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  @IsOptional()
  usuarioId?: number;
}