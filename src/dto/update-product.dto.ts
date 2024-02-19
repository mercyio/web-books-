import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {

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
