import {
  Controller,
  Post,
  Body,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('logout')
  async logout(@Req() request: Request) {
    return { message: 'Logged out successfully' };
  }
}
