import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Tokens } from 'src/entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    if (!refreshToken) throw new UnauthorizedException("유효하지 않은 refresh token 입니다.");

    const storedRefreshToken = await this.tokensRepository.findOne({ where: { user: { id: payload.id } } });
    const refreshTokenCheck = await compare(refreshToken, storedRefreshToken.refreshToken);
    if (!storedRefreshToken || !refreshTokenCheck) throw new UnauthorizedException("유효하지 않은 refresh token 입니다.");

    return { id: payload.id };
  }
}
