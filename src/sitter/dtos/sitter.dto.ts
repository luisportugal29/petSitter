import { Expose, Transform } from "class-transformer";

export class SitterDto {

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    birthDate: string;

    @Expose()
    photoUrl: string;

    @Transform(({obj}) => obj.city.name)
    city: string;

    @Transform(({ obj }) => obj.pets.map(pet => pet.name))
    pets: string[];

}