import { ApiProperty } from '@nestjs/swagger';
import { Lecture } from 'src/entities/lecture.entity';

class GetResultDto {
  constructor(lecture: Lecture) {
    this.id = lecture.id;
    this.name = lecture.name;
    this.description = lecture.description;
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "강의 이름입니다." })
  name: string;

  @ApiProperty({ example: "강의 소개입니다." })
  description?: string;
/*
  @ApiProperty({ example: "https://d2qy1027v9wmpg.cloudfront.net/images/default_user_img.png" })
  profileImagePath?: string;
  */
}

export { GetResultDto }
