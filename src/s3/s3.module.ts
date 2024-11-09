import { Global, Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lecture]),
    MulterModule.register({})
  ],
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: () => {
        return new S3Client({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        });
      },
    },
    S3Service
  ],
  exports: ['S3_CLIENT']
})
export class S3Module {}
