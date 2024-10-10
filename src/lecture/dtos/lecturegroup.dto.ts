import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class LectureGroupCreateDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsArray()
    @IsInt({each:true})
    lectures: number[]
}

class LectureGroupDeleteDto{
    @IsNotEmpty()
    @IsNumber()
    id: number
}

class LectureGroupUpdateDto{
    @IsNotEmpty()
    @IsNumber()
    id: number
    
    @IsString()
    @IsOptional()
    name?: string

    @IsArray()
    @IsInt({each:true})
    @IsOptional()
    lectures?: number[]
}

export {LectureGroupCreateDto, LectureGroupDeleteDto, LectureGroupUpdateDto}