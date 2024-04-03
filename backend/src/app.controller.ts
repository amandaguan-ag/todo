import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('/task')
  async addTask(
    @Body()
    body: {
      description: string;
      priority: string;
      tagNames: string[];
      userEmail: string;
    },
  ) {
    return await this.appService.addTask(body);
  }

  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  @Patch('/task/:id/completion')
  async toggleTaskCompletion(@Param('id') id: string) {
    return await this.appService.toggleTaskCompletion(+id);
  }

  @Patch('/task/:id')
  async updateTask(
    @Param('id') id: string,
    @Body()
    updateTaskDto: {
      description?: string;
      priority?: string;
      tagNames?: string[];
    },
  ) {
    return await this.appService.updateTask(+id, updateTaskDto);
  }

  @Delete('/task/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.appService.deleteTask(+id);
  }

  @Patch('/task/:id/recurring')
  async setTaskRecurring(
    @Param('id') id: string,
    @Body() body: { recurringInterval: string; nextOccurrenceDate: Date },
  ) {
    return await this.appService.setTaskRecurring(+id, body);
  }

  @Get('/task/reminders')
  getTaskReminders() {
    return this.appService.getTaskReminders();
  }

  @Get('/send-test-email')
  async sendTestEmail() {
    await this.notificationService.sendTestEmail();
    return { message: 'Test email sent' };
  }
  @Get('/send-email-now/:taskId')
  async sendEmailNow(@Param('taskId') taskId: number) {
    await this.notificationService.sendEmailNow(taskId);
    return { message: 'Email sent' };
  }
}
