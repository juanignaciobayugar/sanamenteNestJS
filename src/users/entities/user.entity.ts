import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { CalendarNote } from '../../calendar-notes/entities/calendar-note.entity'; // Ajustá la ruta

@Entity('users') // Nombre de la tabla en la DB
export class User {
  @PrimaryGeneratedColumn() // Genera ID automático (1, 2, 3...)
  id: number;

  @Column()
  name: string;
  
 // 1. Cambiamos 'edad' por 'fechaNacimiento' con tipo 'date'
  @Column({ type: 'date', nullable: true }) 
  fechaNacimiento: string; // En TypeScript lo manejamos como string (YYYY-MM-DD)

  @Column({ unique: true }) // El email no se puede repetir
  email: string;

  @Column({ select: false })// <--- Esto hace que TypeORM lo ignore en los 'find'
  password: string;

@OneToMany(() => CalendarNote, (note) => note.usuario)
  notasCalendario: CalendarNote[];

}