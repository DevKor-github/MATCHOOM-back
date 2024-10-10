import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lecture])],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
