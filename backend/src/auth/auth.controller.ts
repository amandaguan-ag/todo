import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type SignUpDto = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
