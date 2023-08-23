import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateSitterDto {

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    address: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsNumber()
    cityId: number;

    @IsString()
    birthDate: string;


}