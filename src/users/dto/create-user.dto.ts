import { IsString, IsEmail, MinLength, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'El nombre es muy corto' })
  name: string; // Aquí recibirás el nombre completo o solo el nombre

 @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser un formato válido (AAAA-MM-DD)' })
  fechaNacimiento: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
