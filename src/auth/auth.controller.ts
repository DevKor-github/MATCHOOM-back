import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register.dto';
import { LoginRequestDto } from './dtos/login.dto';
import { Docs } from 'src/decorator/docs/auth.decorator';
import { User } from 'src/decorator/user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @Docs('register')
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this.authService.register(registerRequestDto);
  }

  @Post('login')
  @Docs('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @Docs('kakao')
  async kakaoLogin() { }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  @Docs('kakao/callback')
  async kakaoLoginCallback(@User() user) {
     return await this.authService.generateTokens(user.id);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('logout')
  async logout(@User() user) {
    const id = user.id;
    return await this.authService.logout(id);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('refresh-token')
  async renewToken(@User() user) {
    const id = user.id;
    return await this.authService.renewToken(id);
  }
}
