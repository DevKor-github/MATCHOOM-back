import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class LectureApplyDto{
    @IsNotEmpty()
    @Transform(({value}) => parseInt(value, 10))
    @IsNumber()
    lectureId: number
}

class LectureReadDto{
    @IsNotEmpty()
    @Transform(({value}) => parseInt(value, 10))
    lectureId: number

    @IsNumber()
    accessType?: number
}

export {LectureApplyDto, LectureReadDto}