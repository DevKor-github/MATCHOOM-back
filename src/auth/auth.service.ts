import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto): Promise<void> {

  }

  async login(loginDto: LoginDto): Promise<void> {

  }

  async logout(): Promise<void> {
    
  }

  async renewToken(): Promise<void> {

  }

}
