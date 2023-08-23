import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([City, State])],
  exports: [LocationService],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
