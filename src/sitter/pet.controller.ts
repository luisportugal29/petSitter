import { Controller, Post, Body } from '@nestjs/common'
import { PetService } from './pet.service';
import { PetDto } from './dtos/pet.dto';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Pets')
@Controller('pet')
export class PetController {

    constructor(private petService: PetService) { }

    @Post()
    create( @Body() body: PetDto ) {
        return this.petService.create(body);
    }
}