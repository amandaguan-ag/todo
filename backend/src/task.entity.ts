import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 'Medium' })
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({ nullable: true })
  recurringInterval: string; 

  @Column({ type: 'date', nullable: true })
  nextOccurrenceDate: Date; 
}
