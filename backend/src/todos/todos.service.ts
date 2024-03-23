import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: { title: string; description: string }): Promise<Todo> {
    const newTodo = this.todosRepository.create(createTodoDto);
    await this.todosRepository.save(newTodo);
    return newTodo;
  }
}