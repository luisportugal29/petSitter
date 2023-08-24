import { 
    Controller, 
    Post, 
    Get, 
    Patch, 
    Delete, 
    UseGuards, 
    Param, 
    Body,
    Query
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateSitterDto } from './dtos/create-sitter.dto';
import { City } from '../location/entities/city.entity';
import { SitterService } from './sitter.service';
import { UpdateSitterDto } from './dtos/update-sitter.dto';
import { SitterDto } from './dtos/sitter.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CriteriaDto } from './dtos/sitter-criteria.dto';
import { CreateComentDto } from './dtos/create-comment.dto';

@ApiTags('Sitters')
@Controller('sitter')
export class SitterController {

    constructor(private sittersService: SitterService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(SitterDto)
    createSitter(@Body() body: CreateSitterDto ) {
        return this.sittersService.createSitter(body);
    }

    @Post('/:sitterId/pet/:petId')
    assignPetToSitter(
        @Param('sitterId') sitterId: string,
        @Param('petId') petId: string
    ) {
        return this.sittersService.assignPet(parseInt(sitterId), parseInt(petId));
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @Serialize(SitterDto)
    updateSitter(@Param('id') id: string, @Body() body: UpdateSitterDto ) {
        return this.sittersService.update(parseInt(id), body);
    }

    @Delete('/:sitterId/pet/:petId')
    removePetFromSitter(
        @Param('sitterId') sitterId: string,
        @Param('petId') petId: string
    ) {
        return this.sittersService.removePet(parseInt(sitterId), parseInt(petId));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    removeSitter(@Param('id') id: string ) {
        return this.sittersService.remove(parseInt(id));
    }

    @Get('/all')
    @UseGuards(AuthGuard)
    getSitters() {
        return this.sittersService.findAll();
    }

    @Get('/:id')
    getSitter(@Param('id') id: string) {
        return this.sittersService.getSitter(parseInt(id));
    }

    @Get('/:id/pet') 
    async getAssignedPets(@Param('id') id: string) {
        const sitter = await this.sittersService.getAssignedPets(parseInt(id));
        return sitter.length ? sitter[0]: {};
    }

    @Get()
    @UseGuards(AuthGuard)
    getSittersByState(@Query() criteriaDto: CriteriaDto) {
        return this.sittersService.findAllByCriteria(criteriaDto);
    }

    @Post('/:id')
    @UseGuards(AuthGuard)
    addCommentToSitter(@Body() commentDto: CreateComentDto,@Param('id') id: string) {
        return this.sittersService.assignComment(commentDto, parseInt(id));
    }

}
