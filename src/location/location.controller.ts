import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateCityDto } from './dtos/create-city.dto';
import { CreateStateDto } from './dtos/create-state.dto';
import { LocationService } from './location.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('location')
export class LocationController {

    constructor(private locationService: LocationService) { }

    @Post('city')
    @UseGuards(AuthGuard)
    addCity(@Body() body: CreateCityDto) {
        return this.locationService.createCity(body);
    }

    @Post('state')
    @UseGuards(AuthGuard)
    addState(@Body() body: CreateStateDto) {
        return this.locationService.createState(body);
    }

    @Get('city')
    getStates() {
        return this.locationService.getCities();
    }
    
}
