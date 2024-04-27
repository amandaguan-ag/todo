import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'crypto';
import { LogInDto, SignUpDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user) {
    const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async signUp(signUpDto: SignUpDto) {
    //check if email already exists
    const emailExits =
      (await this.usersService.findUserByEmail(signUpDto.email)).length > 0;

    if (emailExits) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;
    const user = this.usersService.createUser(signUpDto);
    console.log('USER ', user);

    return await this.createAccessToken(user);
  }

  async logIn(logInDto: LogInDto) {
    console.log('LOG IN DTO:', logInDto);
    return 'fake-token';
  }
}
