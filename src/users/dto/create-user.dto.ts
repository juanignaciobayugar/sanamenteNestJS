import { IsString, IsEmail, IsInt, Min, MinLength, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'El nombre es muy corto' })
  name: string; // Aquí recibirás el nombre completo o solo el nombre

  @IsInt()
  @Min(18) // Suponiendo que debe ser mayor de edad
  @Max(99) // Suponiendo un límite de edad razonable
  edad: number;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
