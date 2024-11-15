import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { Tokens } from 'src/entities/token.entity';
import { Genre } from 'src/entities/genre.entity';
import { JwtAccessStrategy } from './passports/jwtAccess.strategy';
import { JwtRefreshStrategy } from './passports/jwtRefresh.strategy';
import { KakaoStrategy } from './passports/kakao.strategy';
import { UserService } from 'src/user/user.service';
import { S3Service } from 'src/s3/s3.service';
import { CustomGroup } from 'src/entities/customGroup.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Tokens, Genre, CustomGroup]),
    JwtModule.register({})  
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAccessStrategy, JwtRefreshStrategy, KakaoStrategy, S3Service]
})
export class AuthModule {}
