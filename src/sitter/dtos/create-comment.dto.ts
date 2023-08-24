import { IsNumber, IsString, Max, Min, IsNotEmpty } from "class-validator";



export class CreateComentDto {

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;


}