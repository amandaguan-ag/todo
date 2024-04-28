import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/auth.controller';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(user: SignUpDto) {
    return await this.usersRepository.save({ ...user });
  }
}
