import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    name: string

    @IsArray()
    @IsInt({each:true})
    lectures: number[]
}

export {LectureGroupCreateDto, LectureGroupDeleteDto, LectureGroupUpdateDto}