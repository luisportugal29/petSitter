import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Sitter } from "./sitter.entity";

@Entity()
export class Pet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Sitter, (sitter) => sitter.pets)
    sitters: Sitter[];

    
}