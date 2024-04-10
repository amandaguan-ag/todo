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

    const taskTableRows = tasks
      .map(
        (task) =>
          `<tr>
      <td>${task.description}</td>
      <td>${task.dueDate.toDateString()}</td>
      <td>${task.priority}</td>
    </tr>`,
      )
      .join('');

    const emailHtml = `
    <h1>Upcoming Due Tasks</h1>
    <p>You have the following tasks due in the next 7 days:</p>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        ${taskTableRows}
      </tbody>
    </table>
  `;

    const mailOptions = {
      from: '"Task Manager" <your-email@example.com>',
      to: userEmail,
      subject: 'Upcoming Due Tasks',
      html: emailHtml,
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

  @Cron('45 14 * * *')
  async handleCron() {
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

    const tasksByEmail: Record<string, Task[]> = tasksDueSoon.reduce(
      (acc, task) => {
        const userEmail = task.user.email; 
        if (!acc[userEmail]) {
          acc[userEmail] = [];
        }
        acc[userEmail].push(task);
        return acc;
      },
      {},
    );

    await Promise.all(
      Object.entries(tasksByEmail).map(([email, tasks]) =>
        this.sendEmail(email, tasks),
      ),
    );
  }
}
