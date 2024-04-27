import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(signUpDto) {
    console.log('SIGN UP DATA', signUpDto);
    return 'fake token';
  }
}
