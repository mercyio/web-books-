import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ChapterDto {
    @IsNotEmpty()
    @IsString()
    sequenceNumber : string


    @IsNotEmpty()
    @IsString()
    head: string


    @IsNotEmpty()
    @IsString()
    content : string

}
