import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Visit } from './ visits.model';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService],
  imports: [SequelizeModule.forFeature([Visit])],
})
export class VisitsModule {}
