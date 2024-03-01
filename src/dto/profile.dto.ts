import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNotEmpty()
    @IsString()
    location : string

    @IsNotEmpty()
    @IsNumberString()
    contact : number

    @IsNotEmpty()
    @IsString()
    age : string

    @IsNotEmpty()
    @IsNumberString()
    bio : string
}
