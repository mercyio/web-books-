import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ReadChapters {
    @IsNotEmpty()
    @IsString()
    sequenceNumber : string
}
