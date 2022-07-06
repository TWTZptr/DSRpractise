import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './pets.model';
import { InjectModel } from '@nestjs/sequelize';
import { UNEXIST_PET_ID_MSG } from './constants';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet) private petRepository: typeof Pet) {}

  create(createPetDto: CreatePetDto): Promise<Pet> {
    return this.petRepository.create(createPetDto);
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }

  findById(id: number): Promise<Pet> {
    return this.petRepository.findByPk(id);
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const [affectedCount] = await this.petRepository.update(updatePetDto, {
      where: { id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_PET_ID_MSG);
    }

    return await this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    const affectedCount = await this.petRepository.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_PET_ID_MSG);
    }
  }
}
