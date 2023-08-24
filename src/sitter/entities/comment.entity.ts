import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sitter } from "./sitter.entity";


@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @ManyToOne(() => Sitter, sitter => sitter.comments)
    sitter: Sitter;
}