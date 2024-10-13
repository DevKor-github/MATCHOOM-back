import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

class LectureUpdateDto{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    lectureId: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "강의강의의"})
    name?: string

    @IsArray()
    @IsOptional()
    @ApiProperty({example: "[010-1234-5678, 010-2345-6789]", description: "instructor로 추가하고싶은 사람의 id"})
    instructors?: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 30})
    capacity?: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 180, description:"분단위"})
    length?: number

    @IsDateString()
    @IsOptional()
    @ApiProperty({example: "2024-10-13 18:00"})
    openTime?: Date

    @IsDateString()
    @IsOptional()
    @ApiProperty({example: "2024-10-13 19:00"})
    closeTime?: Date

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 1, description: "0~4까지"})
    difficulty?: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "서울시 성북구 안암로 145 지하 1층"})
    location?: string

    @IsString()
    @IsOptional()
    @ApiProperty({example: "설명"})
    description?: string

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: "https://music.apple.com/kr/playlist/2409-2410/pl.u-2aoq8oaFG1pzGj4"})
    music?: boolean

    @IsString()
    @IsOptional()
    @ApiProperty({example: "@insta or 010-1234-5678"})
    contact?: string
}

class LectureDeleteDto{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    lectureId: number
}

export {LectureDeleteDto, LectureUpdateDto}