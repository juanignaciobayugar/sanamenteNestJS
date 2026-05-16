import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'contacto' }) // Nombre de la tabla en MySQL
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  mensaje: string;

  // Relación: Muchos mensajes de contacto pueden pertenecer a un solo Usuario
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' }) // Nombre de la FK en la base de datos
  usuario: User;
}