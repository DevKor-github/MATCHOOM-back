import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register.dto';
import { LoginRequestDto } from './dtos/login.dto';
import { Docs } from 'src/decorator/docs/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
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
  async kakaoLogin() { }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req: any, @Res() res: any) {
    const userId = req.user.userId;
    res.redirect('/');
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('logout')
  async logout(@Req() req: any) {
    const id = req.user.id;
    return await this.authService.logout(id);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('refresh-token')
  async renewToken(@Req() req: any) {
    const id = req.user.id;
    return await this.authService.renewToken(id);
  }
}
