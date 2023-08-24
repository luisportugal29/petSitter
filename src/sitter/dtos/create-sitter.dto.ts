import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateSitterDto {

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsNumber()
    cityId: number;

    @IsString()
    birthDate: string;

    @IsString()
    photoUrl: string;


}