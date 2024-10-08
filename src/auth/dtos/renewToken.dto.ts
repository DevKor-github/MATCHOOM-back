import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class RenewTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  refreshToken: string;
}

class RenewTokenResponseDto {
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;
}

export { RenewTokenRequestDto, RenewTokenResponseDto }
