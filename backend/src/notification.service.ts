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

    const testTask = {
      userEmail: 'amandaguan1314@gmail.com',
      description: 'This is a test task',
    } as Task;
    await this.sendEmailNotification(testTask);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const tasks = await this.taskRepository.find({
      where: {
        nextOccurrenceDate: LessThanOrEqual(new Date()),
        completed: false,
      },
    });

    tasks.forEach((task) => {
      this.sendEmailNotification(task);
    });
  }
}
