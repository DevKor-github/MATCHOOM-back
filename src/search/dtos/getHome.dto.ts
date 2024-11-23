import { ApiProperty } from '@nestjs/swagger';
import { Lecture } from 'src/entities/lecture.entity';

export class GetHomeResponseDto {
  @ApiProperty({ type: [Lecture], description: 'List of hot lectures', example: [{ "id": 5, "name": "춤추는 호랑이", "closeTime": "2024-11-27T01:00:00.000Z", "description": "설명" }]})
  hot: Lecture[];

  @ApiProperty({ type: [Lecture], description: 'List of lectures with upcoming deadlines', example: [{ "id": 5, "name": "춤추는 호랑이", "closeTime": "2024-11-27T01:00:00.000Z", "description": "설명" }]})
  deadline: Lecture[];
}
