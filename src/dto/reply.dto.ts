import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ReplyDto {
    @IsNotEmpty()
    @IsString()
    content : string


}
