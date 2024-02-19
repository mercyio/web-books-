import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    Email : string

    @IsNotEmpty()
    @IsString()
    password : string
}
