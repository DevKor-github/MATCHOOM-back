import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { isDate, IsDate, isDateString, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

class LectureCreateDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "{userId, userId, ... }"})
    instructorId: string
    //자신의 아이디는 제외하기 

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "춤추는 호랑이"})
    name: string

    @IsNumber()
    @ApiProperty({example: 100})
    capacity: number
    //입력하지 않았다면 자동으로 -1

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value), {toClassOnly: true})
    @ApiProperty({example: "2024-10-07 10:00:00"})
    lectureTime: Date

    @IsNumber()
    @ApiProperty({example: 60})
    length: number

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value), {toClassOnly: true})
    @ApiProperty({example: "2024-10-07 09:00:00"})
    openTime: Date

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "2024-10-07 10:00:00"})
    @Transform(({value}) => new Date(value), {toClassOnly: true})
    closeTime: Date

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 1})
    difficulty: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "서울시 성북구 안암로 145 지하 1층"})
    location: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 30000})
    price: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "설명"})
    description?: string

    @IsUrl()
    @ApiProperty({example: "https://music.apple.com/kr/playlist/2409-2410/pl.u-2aoq8oaFG1pzGj4"})
    music?: string

    @IsString()
    @ApiProperty({example: "@insta or 010-1234-5678"})
    contact: string
}

export { LectureCreateDto }