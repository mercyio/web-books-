import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class BookDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description : string

    @IsNotEmpty()
    @IsString()
    genre : string

    @IsNotEmpty()
    @IsString()
    content : string
}
