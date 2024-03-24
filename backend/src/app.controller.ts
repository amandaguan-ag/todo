import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/task')
  async addTask(@Body('title') title: string) {
    console.log('Adding Task:', title);
    const result = await this.appService.addTask(title);
    console.log('Task Added:', result);
    return result;
    //   return await this.appService.addTask(title);
  }

  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  // Define endpoints for updating and deleting tasks
}
