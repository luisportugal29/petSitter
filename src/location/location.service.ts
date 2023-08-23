import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/location/entities/city.entity';
import { State } from 'src/location/entities/state.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dtos/create-city.dto';
import { CreateStateDto } from './dtos/create-state.dto';

@Injectable()
export class LocationService {

    constructor(
        @InjectRepository(City) private cityRepo: Repository<City>,
        @InjectRepository(State) private stateRepo: Repository<State>
    ) { }

    async findStateById(id: number) {

        if ( !id ) {
            return null;
        }

        return this.stateRepo.findOneBy({ id });
    }

    findCityById(id: number) {
        if ( !id ) {
            return null;
        }

        return this.cityRepo.findOneBy({ id });
    }

    getCities() {
        return this.cityRepo.find();
    }

    createState(stateDto: CreateStateDto) {

        const state = this.stateRepo.create(stateDto);

        return this.stateRepo.save(state);

    }

    async createCity(cityDto: CreateCityDto) {

        const state = await this.findStateById(cityDto.stateId);

        if ( !state ) {
            throw new NotFoundException('State Not Found');
        }

        const city = await this.cityRepo.create(cityDto);
        city.state = state;

        return this.cityRepo.save(city);
    }
}
