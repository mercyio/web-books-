import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    email : string

    @IsNotEmpty()
    @IsString()
    password : string
}
