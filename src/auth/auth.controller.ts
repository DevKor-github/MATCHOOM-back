import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register.dto';
import { LoginRequestDto } from './dtos/login.dto';
import { Docs } from 'src/decorator/docs/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  @Docs('register')
  async signUp(@Body() registerRequestDto: RegisterRequestDto) {
    return await this.authService.register(registerRequestDto);
  }

  @Post('login')
  @Docs('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Post('logout')
  @Docs('logout')
  async logout(@Res() res: Response) {
    return await this.authService.logout();
  }

  @Post('refresh-token')
  @Docs('refresh-token')
  async renewToken(@Body() loginDto: LoginRequestDto) {
    return this.authService.renewToken();
  }
}
