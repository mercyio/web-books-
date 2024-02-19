import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname : string

    @IsNotEmpty()
    @IsNumberString()
    contact : number

    @IsNotEmpty()
    @IsString()
    age : string
}
