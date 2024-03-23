import { Controller, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: { title: string; description: string }): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }
}