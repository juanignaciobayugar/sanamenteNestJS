import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Nombre de la tabla en la DB
export class User {
  @PrimaryGeneratedColumn() // Genera ID automático (1, 2, 3...)
  id: number;

  @Column()
  name: string;
  
  @Column('int') // Especificamos que es un entero
  edad: number;

  @Column({ unique: true }) // El email no se puede repetir
  email: string;

  @Column({ select: false })// <--- Esto hace que TypeORM lo ignore en los 'find'
  password: string;

}