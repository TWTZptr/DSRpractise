import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './pets.model';
import { InjectModel } from '@nestjs/sequelize';
import { UNEXIST_PET_ID_MSG } from './constants';
import { PetTypesService } from '../pet-types/pet-types.service';
import { UNEXIST_ROLE_ID_MSG } from '../users/constants';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet) private petRepository: typeof Pet,
    private readonly petTypesService: PetTypesService,
  ) {}

  async create(createPetDto: CreatePetDto, userId: number): Promise<Pet> {
    const petType = await this.petTypesService.findById(createPetDto.typeId);
    if (!petType) {
      throw new BadRequestException(UNEXIST_ROLE_ID_MSG);
    }

    const pet = await this.petRepository.create({
      ...createPetDto,
      ownerId: userId,
    });
    return this.findById(pet.id);
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }

  async findById(id: number): Promise<Pet> {
    const pet = await this.petRepository.findByPk(id, { include: 'petType' });
    if (!pet) {
      throw new NotFoundException();
    }
    return pet;
  }

  findByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.petRepository.findAll({
      where: { ownerId },
      include: ['petType', 'visits'],
    });
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
