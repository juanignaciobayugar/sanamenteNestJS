import { IsString, IsEmail, MinLength, IsDateString, IsNotEmpty,registerDecorator, ValidationOptions } from 'class-validator';

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;
          
          const birthDate = new Date(value);
          if (isNaN(birthDate.getTime())) return false; 
          
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          
          return age >= 18;
        },
      },
    });
  };
}


export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'El nombre es muy corto' })
  name: string; // Aquí recibirás el nombre completo o solo el nombre

@IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser un formato válido (AAAA-MM-DD)' })
  @IsAdult({ message: 'Debes ser mayor de 18 años para registrarte' }) // <-- Aquí lo usas
  fechaNacimiento: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
