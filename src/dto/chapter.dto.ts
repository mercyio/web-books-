import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ChapterDto {
    @IsNotEmpty()
    @IsString()
    sequencenumber : string

    
    @IsNotEmpty()
    @IsString()
    head: string


    @IsNotEmpty()
    @IsString()
    content : string

}
