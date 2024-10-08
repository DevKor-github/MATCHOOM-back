import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { JwtAccessStrategy } from 'src/auth/passports/jwtAccess.strategy';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, User]),
  ],
  controllers: [ LectureController ],
  providers: [ LectureService, JwtAccessStrategy ]
})
export class LectureModule {}
