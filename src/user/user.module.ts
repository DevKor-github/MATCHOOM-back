import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Genre } from 'src/entities/genre.entity';
import { S3Service } from 'src/s3/s3.service';
import { CustomGroup } from 'src/entities/customGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Genre, CustomGroup])
  ],
  providers: [UserService, S3Service],
  controllers: [UserController]
})
export class UserModule {}
