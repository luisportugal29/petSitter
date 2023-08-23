import { IsOptional, IsString } from "class-validator";

export class UpdateSitterDto {

    @IsString()
    @IsOptional()
    name: string; 

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    photoUrl: string;
}