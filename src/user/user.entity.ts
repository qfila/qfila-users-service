import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { RolesEnum } from './enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, unique: true })
  username: string;

  @Column({ length: 500, unique: true })
  email: string;

  @Column({ length: 500 })
  password_hash: string;

  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
  role: RolesEnum;

  @CreateDateColumn()
  created_at: Date;
}
