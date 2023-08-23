import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class State {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => City, (city) => city.state)
    cities: City[];

}