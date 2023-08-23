import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pet } from "./entities/pet.entity";
import { Repository } from "typeorm";
import { PetDto } from "./dtos/pet.dto";

@Injectable()
export class PetService {

    constructor( @InjectRepository(Pet) private repo : Repository<Pet>) { }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(petDto: PetDto) {

        const pet = this.repo.create(petDto);

        return this.repo.save(pet);
    }

}