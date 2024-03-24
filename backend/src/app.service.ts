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

  // Include methods for updating and deleting tasks here
}
