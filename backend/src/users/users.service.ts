import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userDetails: {
    email: string;
    password: string;
  }): Promise<User> {
    console.log('Creating user:', userDetails);
    const newUser = this.usersRepository.create(userDetails);
    await this.usersRepository.save(newUser);
    console.log('User created:', newUser);
    return newUser;
  }
}
