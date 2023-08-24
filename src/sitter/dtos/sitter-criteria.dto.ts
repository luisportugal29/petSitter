import { IsOptional, IsString } from "class-validator";


export class CriteriaDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    state: string;
}