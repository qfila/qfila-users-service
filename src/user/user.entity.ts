import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;
}
