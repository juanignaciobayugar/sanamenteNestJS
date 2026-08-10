import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios') // Nombre de la tabla en MySQL
export class Usuario {
  @PrimaryGeneratedColumn('uuid') // ID autogenerado en formato UUID
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, unique: false })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  actividad: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  telefono?: string;
}