import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'contacto' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_completo', type: 'varchar', length: 150 })
  nombreCompleto: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'text' })
  mensaje: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  // Relación opcional: si no viene id_usuario, queda en NULL
  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User | null;
}