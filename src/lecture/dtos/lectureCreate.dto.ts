import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsInt, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, IsBoolean, IsIn } from "class-validator"
import { RequireBothDates } from "src/decorator/date.decorator"

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
    @ApiProperty({example:5, description:"최소인원"})
    minimum: number

    @IsInt()
    @Min(1)
    @IsOptional()
    @ApiProperty({example: 100})
    capacity: number

    @IsDateString()
    @IsOptional()
    @RequireBothDates()
    @ApiProperty({example: "2024-09-01"})
    startdate?: Date

    @IsDateString()
    @IsOptional()
    @ApiProperty({example: "2024-09-01"})
    enddate?: Date

    @IsArray()
    @IsIn([0,1,2,3,4,6], {each: true})
    @IsOptional()
    yoil?: number[]

    @IsDateString()
    @IsNotEmpty()
    @Transform(({value}) => {
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
            return new Date(value.replace(' ', 'T')); // "YYYY-MM-DD HH:mm:ss" -> "YYYY-MM-DDTHH:mm:ss"
        }
        else if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {
            return value;
        }
        throw new Error('lectureTime 형식이 잘못되었습니다.');
    })
    @ApiProperty({example: "'2024-10-07 10:00:00' | (원데이) 또는 '10:00:00' (정기)"})
    lectureTime: Date | string

    @IsNumber()
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