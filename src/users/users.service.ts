import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Asegurate de que la ruta sea correcta
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // Inyectamos el repositorio de TypeORM para poder interactuar con la tabla 'users'
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Registra un nuevo usuario en la base de datos.
   * Al pasarle el 'createUserDto' completo, TypeORM mapea automáticamente
   * los campos (incluyendo la nueva 'fechaNacimiento') a las columnas de la entidad.
   */
  create(createUserDto: CreateUserDto) {
    // 1. Prepara la nueva instancia del usuario con los datos del DTO
    const newUser = this.usersRepository.create(createUserDto);
    
    // 2. Guarda el usuario en la base de datos y retorna el registro creado (con su ID)
    return this.usersRepository.save(newUser);
  }

  /**
   * Retorna una lista con todos los usuarios de la base de datos.
   * Nota: Por la configuración de tu entidad, el campo 'password' se va a omitir automáticamente.
   */

 findOne(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ 
    where: { email },
    select: ['id', 'email', 'name' ,'password' ] // 👈 LE DICES EXPLÍCITAMENTE QUE TRAIGA LA CONTRASEÑA
  });
}


  findAll() {
    // Busca y devuelve todos los registros de la tabla
    return this.usersRepository.find();
  }
}