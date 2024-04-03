import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Tag } from './tag.entity';
import { Repository, LessThanOrEqual } from 'typeorm'; // Added LessThanOrEqual here
import { HttpException, HttpStatus } from '@nestjs/common';

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
    try {
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
      return await this.getTasks();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasks() {
    return await this.taskRepository.find({ relations: ['tags'] });
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    task.completed = !task.completed;

    if (task.recurringInterval && task.completed) {
      task.nextOccurrenceDate = this.calculateNextOccurrence(
        task.recurringInterval,
        task.nextOccurrenceDate,
      );
      task.completed = false;
    }

    await this.taskRepository.save(task);
    return task;
  }

  private calculateNextOccurrence(
    recurringInterval: string,
    currentNextOccurrenceDate: Date,
  ): Date {
    const currentDate = new Date(currentNextOccurrenceDate);
    switch (recurringInterval) {
      case 'Daily':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'Weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'Bi-Weekly':
        currentDate.setDate(currentDate.getDate() + 14);
        break;
      case 'Monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      default:
        throw new Error(`Unsupported recurring interval: ${recurringInterval}`);
    }
    return currentDate;
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

  async setTaskRecurring(
    id: number,
    recurringData: {
      recurringInterval: string;
      nextOccurrenceDate: Date;
    },
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException(
        `Task with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    task.recurringInterval = recurringData.recurringInterval;
    task.nextOccurrenceDate = recurringData.nextOccurrenceDate;

    await this.taskRepository.save(task);
    return task;
  }

  async getTaskReminders(): Promise<Task[]> {
    const today = new Date();
    return await this.taskRepository.find({
      where: {
        nextOccurrenceDate: LessThanOrEqual(today),
        completed: false,
      },
    });
  }
}
