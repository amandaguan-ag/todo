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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/task')
  async addTask(
    @Body() body: { description: string; priority: string; tagNames: string[] },
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

  @Patch('/task/:id/description')
  async updateTaskDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ) {
    return await this.appService.updateTaskDescription(+id, description);
  }
  
  @Delete('/task/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.appService.deleteTask(+id);
  }
}
