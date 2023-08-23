import { IsString } from "class-validator";


export class SignUserDto {

    @IsString()
    email: string;

    @IsString()
    password: string;
    
}