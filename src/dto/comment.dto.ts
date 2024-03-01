import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    content : string


    @IsNotEmpty()
    @IsString()
    book_id: string
}
