import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { InstructorModule } from './instructor/instructor.module';
import { LectureModule } from './lecture/lecture.module';
import { S3Module } from './s3/s3.module';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      timezone: '+09:00'
    }),
    AuthModule, StudentModule, InstructorModule, LectureModule, S3Module, FcmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
