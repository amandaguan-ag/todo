import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const emailExits = (
      await this.usersService.findUserByEmail(signUpDto.email)
    )?.email;

    if (emailExits) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const user = this.usersService.createUser(signUpDto);

    return await this.createAccessToken(user);
  }

  async verifyPassword(enteredPassword: string, exisitingPassword: string) {
    return await bcrypt.compare(enteredPassword, exisitingPassword);
  }

  async logIn(logInDto: LogInDto) {
    // check user exist
    const user = await this.usersService.findUserByEmail(logInDto.email);
    console.log('USER ', !user);

    //if not exist, throw unatuthozed erroe
    if (!user) {
      throw new UnauthorizedException('username does not exist');
    }

    // verify that password match
    const passwordMatch = await this.verifyPassword(
      logInDto.password,
      user.password,
    );

    //if password not macth, throw unatuthozed erroe
    if (!passwordMatch) {
      throw new UnauthorizedException('incorrect password');
    }

    //create and retunrn access token
    return await this.createAccessToken(user);
  }
}
