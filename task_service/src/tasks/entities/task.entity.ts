import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ default: 'TODO' })
  @IsNotEmpty()
  status: string;

  @CreateDateColumn()
  createdAt?: Date;

  // Help me create UserEntity based on interface User
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
