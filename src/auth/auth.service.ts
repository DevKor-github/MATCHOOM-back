import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dtos/register.dto';
import { LoginRequestDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  async register(registerRequestDto: RegisterRequestDto): Promise<void> {

  }

  async login(loginDto: LoginRequestDto): Promise<void> {

  }

  async logout(): Promise<void> {

  }

  async renewToken(): Promise<void> {

  }

}
