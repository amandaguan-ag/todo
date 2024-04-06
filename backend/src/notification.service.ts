import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Task } from './task.entity'; 

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  private async sendEmailNotification(task: Task): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const taskWithUser = await this.taskRepository.findOne({
      where: { id: task.id },
      relations: ['user'], 
    });

    if (!taskWithUser || !taskWithUser.user) {
      throw new Error(`User not found for task with ID ${task.id}`);
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: taskWithUser.user.email, 
      subject: 'Task Reminder',
      text: `You have an upcoming task: ${task.description}`,
    });
  }

  public async sendTestEmail(): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { completed: false }, 
      order: { createdAt: 'DESC' },
    });

    if (task) {
      await this.sendEmailNotification(task);
    } else {
      throw new Error('No task available for sending a test email.');
    }
  }

  public async sendEmailNow(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (task) {
      await this.sendEmailNotification(task);
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  }
}
