import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    email : string

    @IsNotEmpty()
    @IsString()
    password : string

    @IsNotEmpty()
    @IsString()
    displayName : string
}
