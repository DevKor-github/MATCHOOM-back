import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsIn, IsNotEmpty, IsString, Length } from "class-validator";

class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "이름이지" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "0100000000" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: "root00))" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "닉네임이지" })
  nickname: string;

  @IsDate()
  @ApiProperty({ example: "1900-01-01" })
  birthday: Date;

  @IsString()
  @ApiProperty({ example: "male" })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['choreography', 'kpop', 'hiphop', 'girls_hiphop', 'girlish', 'waacking', 'hillchoreo', 'b_boy', 'krump', 'popping', 'house', 'street', 'jazz', 'korean_dance', 'modern_dance', 'ballet', 'breaking', 'latin', 'large_group_dance', 'freestyle'])
  @ApiProperty({ example: "kpop" })
  genre: string[];

  @IsString()
  @ApiProperty({ example: "서울특별시 성북구 안암로 145" })
  address: string;
}

class RegisterResponseDto {
  @ApiProperty({ example: "닉네임이지" })
  nickname: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  refreshToken: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;

  @ApiProperty({ example: "1" })
  id: number;
}

export { RegisterRequestDto, RegisterResponseDto }
