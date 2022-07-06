import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pet } from './pets.model';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [SequelizeModule.forFeature([Pet])],
})
export class PetsModule {}
