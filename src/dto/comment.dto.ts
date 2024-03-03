import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    ratings : string

    @IsNotEmpty()
    @IsString()
    comment : string

}
