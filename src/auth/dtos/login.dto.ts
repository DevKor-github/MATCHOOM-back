import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
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
