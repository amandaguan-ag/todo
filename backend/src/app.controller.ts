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
}
