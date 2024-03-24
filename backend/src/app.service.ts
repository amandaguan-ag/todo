import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async addTask(title: string) {
    await this.taskRepository.save({
      title,
    });
    return this.getTasks();
  }

  async getTasks() {
    return await this.taskRepository.find();
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    task.completed = !task.completed;
    await this.taskRepository.save(task);
    return task;
  }

  // Include methods for deleting tasks here
}
