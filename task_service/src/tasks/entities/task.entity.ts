import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  dueDate: Date;

  @Column({ default: 'TODO' })
  @IsNotEmpty()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
