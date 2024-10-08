import { IsNotEmpty, IsString } from "class-validator"

class SearchDto{
    @IsNotEmpty()
    @IsString()
    queue: string
}

export {SearchDto}