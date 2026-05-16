import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Ajusta la ruta según tu proyecto

@Entity('registros_diarios')
@Unique(['user', 'fecha'])
export class DailyRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  // AGREGAR: ? y | null para que TypeScript no chille
  @Column({ type: 'int', nullable: true, name: 'estado_emocional' })
  estadoEmocional?: number | null; 

  @Column({ type: 'int', nullable: true, name: 'estado_energia' })
  estadoEnergia?: number | null;

  @Column({ type: 'int', nullable: true, name: 'estado_dolor' })
  estadoDolor?: number | null;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}