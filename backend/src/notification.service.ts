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
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }

  @Cron('30 23 * * *') 
  async handleCron() {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const tasksDueSoon = await this.taskRepository.find({
      where: {
        dueDate: LessThan(sevenDaysFromNow), 
      },
    });

    const tasksByEmail: { [key: string]: Task[] } = tasksDueSoon.reduce(
      (acc, task) => {
        if (!acc[task.userEmail]) {
          acc[task.userEmail] = [];
        }
        acc[task.userEmail].push(task);
        return acc;
      },
      {} as { [key: string]: Task[] },
    ); 

    Object.entries(tasksByEmail).forEach(([email, tasks]) => {
      this.sendEmail(email, tasks as Task[]); 
    });
  }
}
