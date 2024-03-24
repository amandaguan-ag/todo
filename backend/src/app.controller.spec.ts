import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Patch, Delete, Param } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const appServiceMock = {
      addTask: jest.fn(),
      getTasks: jest.fn(),
      toggleTaskCompletion: jest.fn(),
      deleteTask: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should call appService.addTask when a new task is added', async () => {
    const taskTitle = 'New Task';
    await appController.addTask(taskTitle);
    expect(appService.addTask).toHaveBeenCalledWith(taskTitle);
  });

  // Add more tests for getTasks, toggleTaskCompletion, and deleteTask
});
