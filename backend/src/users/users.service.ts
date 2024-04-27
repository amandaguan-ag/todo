import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/auth.controller';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.usersRepository.findBy({ email });
  }

  async createUser(user: SignUpDto) {
    return await this.usersRepository.save({ ...user });
  }
}
