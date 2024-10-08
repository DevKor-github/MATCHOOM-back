import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

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
  @IsOptional()
  @ApiProperty({ example: "닉네임이지" })
  nickname?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: "1900-01-01" })
  birthday?: string;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  @ApiProperty({ example: "male" })
  gender?: string;

  @IsOptional()
  @IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], { each: true })
  @ApiProperty({ example: [0, 1, 2] })
  genres?: number[];

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "서울특별시 성북구 안암로 145" })
  address?: string;
}

class RegisterResponseDto {
  @ApiProperty({ example: "1" })
  id: number;

  @ApiProperty({ example: "닉네임이지" })
  nickname: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  refreshToken: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;
}

export { RegisterRequestDto, RegisterResponseDto }
