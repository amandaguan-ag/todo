import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Task } from './task.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  private async sendEmail(userEmail: string, tasks: Task[]) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Task Manager" <your-email@example.com>',
      to: userEmail,
      subject: 'Upcoming Due Tasks',
      text: `You have tasks due in the next 7 days: ${tasks.map((task) => task.description).join(', ')}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
        return;
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Response:', info);
    });
  }

  public async sendTestEmail(): Promise<void> {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const tasksDueSoon = await this.taskRepository.find({
      where: {
        dueDate: LessThan(sevenDaysFromNow),
        completed: false,
      },
    });

    if (tasksDueSoon.length === 0) {
      console.error('No upcoming tasks found.');
      return;
    }

    const tasksByEmail: { [key: string]: Task[] } = {};
    tasksDueSoon.forEach((task) => {
      if (!tasksByEmail[task.userEmail]) {
        tasksByEmail[task.userEmail] = [];
      }
      tasksByEmail[task.userEmail].push(task);
    });

    Object.entries(tasksByEmail).forEach(([email, tasks]) => {
      this.sendEmail(email, tasks);
    });
  }

  @Cron('14 14 * * *') 
  async handleCron() {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const tasksDueSoon = await this.taskRepository.find({
      where: {
        dueDate: LessThan(sevenDaysFromNow),
        completed: false,
      },
    });

    const tasksByEmail: { [key: string]: Task[] } = {};
    tasksDueSoon.forEach((task) => {
      if (!tasksByEmail[task.userEmail]) {
        tasksByEmail[task.userEmail] = [];
      }
      tasksByEmail[task.userEmail].push(task);
    });

    Object.entries(tasksByEmail).forEach(([email, tasks]) => {
      this.sendEmail(email, tasks);
    });
  }
}
