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

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Tokens, Genre]),
    JwtModule.register({})  
  ] ,
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
