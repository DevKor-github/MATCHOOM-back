import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Genre } from 'src/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Genre])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
