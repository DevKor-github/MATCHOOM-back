import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { Lecture } from 'src/entities/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
