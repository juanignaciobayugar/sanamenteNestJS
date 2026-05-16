import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'notas_calendario' })
export class CalendarNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  contenido: string;

// Cambiamos a una columna normal para que el usuario elija la hora de la agenda
  @Column({ type: 'varchar', length: 5, name: 'creado_en' }) // Guarda formatos como "14:30" o "09:00"
  creadoEn: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;
}