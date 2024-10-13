import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class LectureGroupCreateDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "강의 이름"})
    name: string

    @IsNotEmpty()
    @IsArray()
    @IsInt({each:true})
    @ApiProperty({example: [1,2,3,4,5,6,7,8,9,10]})
    lectures: number[]
}

class LectureGroupDeleteDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 5, description: "강의 그룹 번호"})
    id: number
}

class LectureGroupUpdateDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 5, description: "강의 그룹 번호"})
    id: number
    
    @IsString()
    @IsOptional()
    @ApiProperty({example: "춤추는 호랑이", description: "Optional"})
    name?: string

    @IsArray()
    @IsInt({each:true})
    @IsOptional()
    @ApiProperty({example: [1,2,3,4,5,6], description: "강의 번호들 Array로"})
    lectures?: number[]
}

export {LectureGroupCreateDto, LectureGroupDeleteDto, LectureGroupUpdateDto}