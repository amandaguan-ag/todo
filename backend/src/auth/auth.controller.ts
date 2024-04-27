import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { AuthGuard } from './auth.guard';

export class SignUpDto {
  @IsEmail()
  @Transform(({ value }) => sanitizeHtml(value))
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  password: string;
}

export class LogInDto {
  @IsEmail()
  @Transform(({ value }) => sanitizeHtml(value))
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('log-in')
  logIn(@Body() body: LogInDto) {
    return this.authService.logIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('user-details')
  getUser(@Request() req) {
    if (req.user) {
      return req.user;
    } else {
      return 'no user';
    }
  }
}
