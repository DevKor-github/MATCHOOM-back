import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
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

  async uploadFile(directory: string, extension: string, file: Express.Multer.File): Promise<string> {
    const key = `images/${directory}/${uuidv4()}.${extension}`;

    try{
      await this.s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));
  
      return key;

    } catch (e) {
      console.log(e);
    }
  }

  async deleteFile(key: string) {
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key
    }));

    return { message: "이미지 삭제 성공" };
  }

}
