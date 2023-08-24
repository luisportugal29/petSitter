import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sitter } from "./entities/sitter.entity"; 
import { CreateSitterDto } from "./dtos/create-sitter.dto";
import { LocationService } from "src/location/location.service";
import { PetService } from "./pet.service";
import { CriteriaDto } from "./dtos/sitter-criteria.dto";
import { CreateComentDto } from "./dtos/create-comment.dto";
import { Comment } from "./entities/comment.entity"; 

@Injectable()
export class SitterService {

    constructor(
        @InjectRepository(Sitter) private repo: Repository<Sitter>,
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
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
        return this.repo.find({
            relations: { city: true, pets: true }
        });
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

    getSitter(sitterId: number) {
        return this.repo.findOne({
            where: { id: sitterId },
            relations: { pets: true, city: true, comments: true }
        }); 
    }

    getAssignedPets(sitterId: number) {
        return this.repo.find({
            where: { id: sitterId},
            select: { pets: true },
            relations: { pets: true},
            take: 1
        });
    }

    findAllByCriteria(criteriaDto: CriteriaDto) {
        const { name, state } = criteriaDto;
        const query = this.repo.createQueryBuilder('sitter');
        if ( name && state ) {
            query
            .innerJoin('sitter.city', 'city')
            .innerJoin('city.state','state')
            .where('state.name = :stateName', { stateName : state })
            .andWhere('sitter.name like :sitterName', { sitterName: `${name}%` } )
        }

        if ( state && !name ) {
            query
            .innerJoin('sitter.city', 'city')
            .innerJoin('city.state','state')
            .where('state.name = :name', { name : state })
        }

        if ( name && !state ) {
            query
            .where('sitter.name like :name', { name: `${name}%` })
        }

        return query.getMany();
    }

    async assignComment(commentDto : CreateComentDto, sitterId: number) {

        const sitter = await this.findOne(sitterId);

        if ( !sitter ) {
            throw new NotFoundException('Sitter Not Found');
        }

        const comment = this.commentRepo.create(commentDto);

        comment.sitter = sitter;

        return this.commentRepo.save(comment);
    }
}