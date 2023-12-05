import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    Email : string

    @IsNotEmpty()
    @IsNumber()
    contact : number

    @IsNotEmpty()
    @IsString()
    password : string
}
