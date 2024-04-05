import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Tag } from './tag.entity';
import { Repository, LessThanOrEqual } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User) 
    private userRepository: Repository<User>, 
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async addTask(taskData: {
    description: string;
    priority: string;
    userEmail: string;
    dueDate: Date;
  }) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: taskData.userEmail },
      });

      if (!user) {
        console.error(`User with email ${taskData.userEmail} not found.`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const newTask = this.taskRepository.create({
        ...taskData,
        user: user,
      });

      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      if (error.status) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to create task',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getTasks() {
    return await this.taskRepository.find({ relations: ['tags'] });
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

  async registerUser(userData: { name: string; email: string }) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new HttpException(
          `User with email ${userData.email} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);

      if (error.status) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to register user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUpcomingTasks() {
    const today = new Date();
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
    );
    return await this.taskRepository.find({
      where: {
        dueDate: LessThanOrEqual(nextWeek),
        completed: false,
      },
    });
  }
}
