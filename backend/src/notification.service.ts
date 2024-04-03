import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Task } from './task.entity';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  private async sendEmailNotification(task: Task): Promise<void> {
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

    await transporter.sendMail({
      from: '"Task Reminder" <your-email@example.com>',
      to: task.userEmail,
      subject: 'Upcoming Task Reminder',
      text: `Don't forget your upcoming task: ${task.description}`,
    });
  }

  public async sendTestEmail(): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { completed: false },
      order: { createdAt: 'DESC' },
    });

    if (!task) {
      throw new Error('No task available for sending test email.');
    }

    await this.sendEmailNotification(task);
  }

  public async sendEmailNow(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    if (task) {
      await this.sendEmailNotification(task);
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  }

  @Cron('0 16 * * *')
  async handleCron() {
    const tasks = await this.taskRepository.find({
      where: {
        nextOccurrenceDate: LessThanOrEqual(new Date()),
        completed: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    const tasksByEmail = tasks.reduce(
      (acc: { [key: string]: Task[] }, task) => {
        if (task.userEmail) {
          if (!acc[task.userEmail]) {
            acc[task.userEmail] = [];
          }
          acc[task.userEmail].push(task);
        }
        return acc;
      },
      {},
    );

    for (const [email, tasks] of Object.entries(tasksByEmail)) {
      const taskDescriptions = tasks
        .map((task: Task) => `- ${task.description}`) 
        .join('\n');
      const emailBody = `You have the following tasks due:\n\n${taskDescriptions}`;
      await this.sendCombinedEmailNotification(email, emailBody);
    }
  }

  private async sendCombinedEmailNotification(
    email: string,
    emailBody: string,
  ): Promise<void> {
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

    await transporter.sendMail({
      from: '"Task Reminder" <your-email@example.com>',
      to: email,
      subject: 'Upcoming Task Reminders',
      text: emailBody,
    });
  }
}
