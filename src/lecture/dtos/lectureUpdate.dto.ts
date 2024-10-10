import { Transform } from "class-transformer"
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

class LectureUpdateDto{
    @IsNumber()
    @IsNotEmpty()
    lectureId: number

    @IsString()
    @IsOptional()
    name?: string

    //Array로 Refactor 고려
    @IsArray()
    @IsOptional()
    instructors?: string

    @IsNumber()
    @IsOptional()
    capacity?: number

    @IsNumber()
    @IsOptional()
    length?: number

    @IsString()
    @IsOptional()
    @Transform(({value}) => new Date(value), {toClassOnly: true})
    openTime?: Date

    @IsString()
    @IsOptional()
    @Transform(({value}) => new Date(value), {toClassOnly: true})
    closeTime?: Date

    @IsNumber()
    @IsOptional()
    difficulty?: number

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsBoolean()
    @IsOptional()
    music?: boolean

    @IsString()
    @IsOptional()
    contact?: string
}

class LectureDeleteDto{
    @IsNumber()
    @IsNotEmpty()
    lectureId: number
}

export {LectureDeleteDto, LectureUpdateDto}