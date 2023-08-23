import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { State } from "./state.entity";
import { Sitter } from "../../sitter/entities/sitter.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => State, (state) => state.cities)
    state: State;

    @OneToMany(()=> Sitter, (sitter) => sitter.city)
    sitters: Sitter[];
}