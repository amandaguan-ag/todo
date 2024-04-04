import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Tag } from './tag.entity';
import { User } from './user.entity'; 

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

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
