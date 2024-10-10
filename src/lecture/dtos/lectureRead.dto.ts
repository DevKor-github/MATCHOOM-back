import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class LectureApplyDto{
    @IsNumber()
    @IsNotEmpty()
    lectureId: number
}

class LectureReadDto{
    @IsNumber()
    @IsNotEmpty()
    lectureId: number

    @IsNumber()
    accessType?: number
}

export {LectureApplyDto, LectureReadDto}