import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sitter } from "./entities/sitter.entity"; 
import { City } from "../location/entities/city.entity";
import { CreateSitterDto } from "./dtos/create-sitter.dto";
import { LocationService } from "src/location/location.service";
import { PetService } from "./pet.service";

@Injectable()
export class SitterService {

    constructor(
        @InjectRepository(Sitter) private repo: Repository<Sitter>,
        private locationService: LocationService,
        private petService: PetService
    ) { }

    async createSitter(sitterDto: CreateSitterDto) {

        const city = await this.locationService.findCityById(sitterDto.cityId);

        if ( !city ) {
            throw new BadRequestException('City Not Found');
        }
        
        const sitter = this.repo.create(sitterDto);
        sitter.city = city;

        return this.repo.save(sitter);
    }

    async findOne(id: number) {
        if ( !id ) {
            return null;
        }
        
        return this.repo.findOne({
            where: {  id },
            relations: { pets: true }

        });
    }

    findAll() {
        return this.repo.find();
    }

    findAllByState(name: string) {
        return this.repo.createQueryBuilder('sitter')
            .innerJoin('sitter.city', 'city')
            .innerJoin('city.state','state')
            .where('state.name = :name', { name })  
            .getMany();  
    }

    async remove(id: number) {

        const sitter = await this.findOne(id);

        if ( !sitter ) {
            throw new NotFoundException('Sitter Not Found');
        }

        return this.repo.remove(sitter);
    }

    async update(id: number, attrs: Partial<Sitter>) {

        const sitter = await this.findOne(id);

        if ( !sitter ) {
            throw new NotFoundException('Sitter Not Found');
        }

        Object.assign(sitter, attrs);

        return this.repo.save(sitter);
    }

    async assignPet(sitterId: number, petId: number) {

        const sitter = await this.findOne(sitterId);

        if ( !sitter ) {
            throw new NotFoundException('Sitter Not Found');
        }

        const pet = await this.petService.findOne(petId);

        if ( !pet ) {
            throw new NotFoundException('Pet Not Found');
        }

        
        sitter.pets.push(pet);

        return this.repo.save(sitter);
        
    }

    async removePet(sitterId: number, petId: number) {

        const sitter = await this.findOne(sitterId);

        if ( !sitter ) {
            throw new NotFoundException('Sitter Not Found');
        }

        const pet = await this.petService.findOne(petId);

        if ( !pet ) {
            throw new NotFoundException('Pet Not Found');
        }

        sitter.pets = sitter.pets.filter( pet => pet.id != petId );

        return this.repo.save(sitter);
        
    }

    getAssignedPets(sitterId: number) {
        return this.repo.find({
            where: { id: sitterId},
            select: { pets: true },
            relations: { pets: true},
            take: 1
        });
    }
}