import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    Email : string

    @IsNotEmpty()
    @IsNumberString()
    contact : number

    @IsNotEmpty()
    @IsString()
    password : string
}
