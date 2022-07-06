import { Injectable } from '@nestjs/common';
import { PetType } from './pet-types.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PetTypesService {
  constructor(
    @InjectModel(PetType) private petTypeRepository: typeof PetType,
  ) {}

  findAll(): Promise<PetType[]> {
    return this.petTypeRepository.findAll();
  }

  findById(id: number): Promise<PetType> {
    return this.petTypeRepository.findByPk(id);
  }
}
