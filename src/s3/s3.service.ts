import { S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class S3Service {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('S3_CLIENT')
    private readonly s3Client: S3Client
  ) { }

  async udpateFile(file: Express.Multer.File) {

  }
  
}
