import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Visit } from './visits.model';
import { PetsModule } from '../pets/pets.module';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService],
  imports: [SequelizeModule.forFeature([Visit]), PetsModule],
})
export class VisitsModule {}
