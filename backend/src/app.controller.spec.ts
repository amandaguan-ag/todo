import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService & {
    addTask: jest.Mock;
    getTasks: jest.Mock;
    toggleTaskCompletion: jest.Mock;
    deleteTask: jest.Mock;
  };

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
    appService = app.get<AppService>(AppService) as any;
  });

  it('should call appService.addTask when a new task is added', async () => {
    const taskTitle = 'New Task';
    await appController.addTask(taskTitle);
    expect(appService.addTask).toHaveBeenCalledWith(taskTitle);
  });
  it('should retrieve all tasks successfully', async () => {
    const mockTasks = [{ id: 1, title: 'Test Task', completed: false }];
    appService.getTasks.mockResolvedValue(mockTasks);

    const tasks = await appController.getTasks();

    expect(appService.getTasks).toHaveBeenCalled();
    expect(tasks).toEqual(mockTasks);
  });

  it('should toggle task completion successfully', async () => {
    const taskId = 1;
    const mockTask = { id: taskId, title: 'Test Task', completed: false };
    appService.toggleTaskCompletion.mockResolvedValue({
      ...mockTask,
      completed: !mockTask.completed,
    });

    const updatedTask = await appController.toggleTaskCompletion(
      taskId.toString(),
    );

    expect(appService.toggleTaskCompletion).toHaveBeenCalledWith(taskId);
    expect(updatedTask.completed).toBe(true);
  });
  it('should delete a task successfully', async () => {
    const taskId = 1;
    appService.deleteTask.mockResolvedValue(undefined); 

    await appController.deleteTask(taskId.toString());

    expect(appService.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
