import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsIn, IsEnum } from 'class-validator';

export class UpdateUserDto {
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
    
    @IsString()
    @IsOptional()
    @ApiProperty({ example: "서울특별시 성북구 안암로 145" })
    address?: string;
  
    @IsOptional()
    @IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], { each: true })
    @ApiProperty({ example: [0, 1, 2] })
    genres?: number[];
  
}
