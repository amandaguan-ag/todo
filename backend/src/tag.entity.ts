import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Task } from './task.entity'; 

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
}