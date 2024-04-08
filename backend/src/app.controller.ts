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

  @Post('/sendTestEmail')
  async sendTestEmail() {
    await this.notificationService.sendTestEmail();
    return { message: 'Test email sent.' };
  }
}
