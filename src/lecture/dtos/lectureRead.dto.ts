import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class LectureApplyDto{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    lectureId: number
}

class LectureReadDto{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1, description: "강의 고유 ID"})
    lectureId: number

    @IsNumber()
    @ApiProperty({example: 0, description: "AccessType: 1강사 0학생"})
    accessType?: number
}

export {LectureApplyDto, LectureReadDto}