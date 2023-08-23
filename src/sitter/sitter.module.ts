import { Module } from '@nestjs/common';
import { SitterController } from './sitter.controller';
import { SitterService } from './sitter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from 'src/location/location.module';
import { Pet } from './entities/pet.entity';
import { Sitter } from './entities/sitter.entity';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';

@Module({
  imports: [LocationModule,TypeOrmModule.forFeature([Pet, Sitter])],
  controllers: [SitterController, PetController],
  providers: [SitterService, PetService]
})
export class SitterModule {}