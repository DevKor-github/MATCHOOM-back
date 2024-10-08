import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [LectureController],
  providers: [AuthService, LectureService, AuthService]
})
export class LectureModule {}
