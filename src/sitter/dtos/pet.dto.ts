import { IsString } from "class-validator";


export class PetDto {
    
    @IsString()
    name: string;
}