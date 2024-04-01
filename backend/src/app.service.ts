import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Tag) 
    private tagRepository: Repository<Tag>, 
  ) {}

  async addTask(taskData: {
    description: string;
    priority: string;
    tagNames: string[];
  }) {
    const tags = await Promise.all(
      taskData.tagNames.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepository.create({ name });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const newTask = this.taskRepository.create({ ...taskData, tags }); 
    await this.taskRepository.save(newTask);
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

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Task with ID ${id} not found.`);
    }
  }
}
