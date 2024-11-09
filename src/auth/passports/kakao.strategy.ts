import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { UserService } from 'src/user/user.service';
import { error } from 'console';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    try {
      const { id, username } = profile;

      if (!id) done(new UnauthorizedException("카카오 계정 정보를 불러올 수 없습니다."));
      const user = await this.userService.findOrCreateByKakaoId(id, username);

      return done(null, user);
    } catch (err) {
      console.error("카카오 인증 에러", error);
      return done(error, false);
    }
  }
}
