import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly nombre: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'La actividad es obligatoria' })
  readonly actividad: string;

  @IsString()
  @IsOptional() // O @IsNotEmpty() si querés que el teléfono sea obligatorio
  readonly telefono?: string;
}