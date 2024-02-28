import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class BookmarkDto {
    @IsNotEmpty()
    @IsString()
    book_id : string

}
