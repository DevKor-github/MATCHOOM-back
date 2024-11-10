import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

class FindUserDto {
  constructor(user: User) {
    this.nickname = user.nickname;
    this.description = user.description;
    this.profileImagePath = user.profileImagePath;
  }

  @ApiProperty({ example: "닉네임이지" })
  nickname?: string;

  @ApiProperty({ example: "강사 소개입니다." })
  description?: string;

  @ApiProperty({ example: "adfkasdfkjadlfkjasv.png" })
  profileImagePath?: string;
}

class FindPrivateUserDto extends FindUserDto {
  constructor(user: User) {
    super(user);
    this.userId = user.userId;
    this.name = user.name;
    this.birthday = user.birthday;
    this.description = user.description;
    this.profileImagePath = user.profileImagePath;
  }
  @ApiProperty({ example: "0100000000" })
  userId: string;

  @ApiProperty({ example: "이름이지" })
  name?: string;

  @ApiProperty({ example: "1900-01-01" })
  birthday?: Date;

  @ApiProperty({ example: "male" })
  gender?: string;

  @ApiProperty({ example: "서울특별시 성북구 안암로 145" })
  address?: string;

  @ApiProperty({ example: [0, 1, 2] })
  genres?: number[];
}

export { FindUserDto, FindPrivateUserDto }
