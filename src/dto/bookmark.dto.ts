import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class BookmarkDto {
    @IsNotEmpty()
    @IsString()
    bookId : string

}
