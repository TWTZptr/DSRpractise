import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PetTypesController } from './pet-types.controller';
import { PetType } from './pet-types.model';
import { PetTypesService } from './pet-types.service';

@Module({
  controllers: [PetTypesController],
  providers: [PetTypesService],
  imports: [SequelizeModule.forFeature([PetType])],
  exports: [PetTypesService],
})
export class PetTypesModule {}
