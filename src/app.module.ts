import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { InstructorModule } from './instructor/instructor.module';
import { LectureModule } from './lecture/lecture.module';
import { S3Module } from './s3/s3.module';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [AuthModule, StudentModule, InstructorModule, LectureModule, S3Module, FcmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
