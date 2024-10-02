import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "0100000000" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: "root00))" })
  password: string;
}

class LoginResponseDto {
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  refreshToken: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;

  @ApiProperty({ example: "1" })
  id: number;
}

export { LoginRequestDto, LoginResponseDto }
