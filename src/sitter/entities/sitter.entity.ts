import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToMany, 
    ManyToOne,
    JoinTable  
} from "typeorm";
import { City } from "../../location/entities/city.entity";
import { Pet } from "./pet.entity";

@Entity()
export class Sitter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column({type: 'date'})
    birthDate: string;

    @Column({nullable: true})
    photoUrl: string;

    @ManyToOne(() => City, (city) => city.sitters)
    city: City;

    @ManyToMany(() => Pet, (pet) => pet.sitters)
    @JoinTable()
    pets: Pet[];


}