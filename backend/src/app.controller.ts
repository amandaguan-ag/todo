import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/name')
  async addName(@Body('name') name: string) {
    return await this.appService.addName(name);
  }

  @Get()
  getNames() {
    return this.appService.getNames();
  }
}
