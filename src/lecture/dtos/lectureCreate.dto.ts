import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, IsBoolean, IsIn } from "class-validator"

class LectureCreateDto{
    @IsArray()
    @IsOptional()
    @ApiProperty({example: "[userId, userId, ... ]"})
    instructorId?: string[]
    //자신의 아이디는 제외하기

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: "true", description:"true이면 정기, false나 undefined이면 원데이"})
    lecturetype: boolean

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "춤추는 호랑이"})
    name: string

    @IsNumber()
    @IsOptional()
    @Min(0)
    @ApiProperty({example:5, description:"최소인원"})
    minimum: number

    @IsInt()
    @Min(1)
    @IsOptional()
    @ApiProperty({example: 100})
    capacity: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({example: "'2024-10-07 10:00:00' | (원데이) 또는 ['2024-10-07 10:00:00', '2024-10-22 10:00:00'] | 여러개"})
    lectureTime: Date | Date[]

    @IsNumber()
    @Min(0)    
    @ApiProperty({example: 60})
    length: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({example: "2024-10-07 09:00:00"})
    openTime: Date

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({example: "2024-10-07 10:00:00"})
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
    @Min(0)
    @IsNotEmpty()
    @ApiProperty({example: 30000})
    price: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "설명"})
    description?: string

    @IsUrl()
    @IsOptional()
    @ApiProperty({example: "https://music.apple.com/kr/playlist/2409-2410/pl.u-2aoq8oaFG1pzGj4"})
    music?: string

    @IsString()
    @ApiProperty({example: "@insta or 010-1234-5678"})
    contact: string
}

export { LectureCreateDto }