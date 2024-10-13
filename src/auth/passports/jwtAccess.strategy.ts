import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) throw new UnauthorizedException('Access token has expired');

    return { id: payload.id };
  }
}
