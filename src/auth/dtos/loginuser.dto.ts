import { IsNotEmpty, IsNumber } from "class-validator";

export class LoginUserDto{
    @IsNumber()
    @IsNotEmpty()
    id: number
}