import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pet } from './pets.model';
import { AuthModule } from '../auth/auth.module';
import { PetTypesModule } from '../pet-types/pet-types.module';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [SequelizeModule.forFeature([Pet]), AuthModule, PetTypesModule],
})
export class PetsModule {}
