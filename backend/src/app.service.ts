import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity'; 
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrFindTags(tagNames: string[]): Promise<Tag[]> {
    return Promise.all(
      tagNames.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepository.create({ name });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );
  }

  async addTask(taskData: {
    description: string;
    priority: string;
    tagNames: string[];
    userEmail: string;
  }): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { email: taskData.userEmail },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const tags = await this.createOrFindTags(taskData.tagNames);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const newTask = this.taskRepository.create({
      ...taskData,
      dueDate: dueDate,
      tags: tags,
      user: user,
    });

    try {
      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      throw new HttpException(
        'Failed to save task: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasks(userEmail: string) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.taskRepository.find({
      where: { user: user },
      relations: ['tags'],
    });
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

  async updateTask(
    id: number,
    updateTaskDto: {
      description?: string;
      priority?: string;
      tagNames?: string[];
    },
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!task) {
      throw new HttpException(
        `Task with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateTaskDto.description) task.description = updateTaskDto.description;
    if (updateTaskDto.priority) task.priority = updateTaskDto.priority;

    if (updateTaskDto.tagNames) {
      const tags = await Promise.all(
        updateTaskDto.tagNames.map(async (name) => {
          let tag = await this.tagRepository.findOne({ where: { name } });
          if (!tag) {
            tag = this.tagRepository.create({ name });
            await this.tagRepository.save(tag);
          }
          return tag;
        }),
      );

      task.tags = tags;
    }

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
