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
  addTask(
    @Body()
    body: {
      description: string;
      priority: string;
      userEmail: string;
      dueDate: Date;
    },
  ) {
    return this.appService.addTask(body);
  }

  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  @Patch('/task/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: { description?: string; priority?: string },
  ) {
    return this.appService.updateTask(+id, updateTaskDto);
  }

  @Delete('/task/:id')
  deleteTask(@Param('id') id: string) {
    return this.appService.deleteTask(+id);
  }

  @Post('/register')
  registerUser(@Body() body: { name: string; email: string }) {
    return this.appService.registerUser(body);
  }

  @Get('/task/upcoming')
  getUpcomingTasks() {
    return this.appService.getUpcomingTasks();
  }

  @Get('/send-test-email')
  async sendTestEmail() {
    await this.notificationService.sendTestEmail();
    return { message: 'Test email sent.' };
  }

  @Get('/send-email-now/:taskId')
  async sendEmailNow(@Param('taskId') taskId: number) {
    await this.notificationService.sendEmailNow(taskId);
    return { message: 'Email sent for task ' + taskId };
  }
}
