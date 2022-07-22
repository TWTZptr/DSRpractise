import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { PetsService } from '../pets/pets.service';
import { UNEXIST_PET_ID_MSG } from '../pets/constants';

@Controller('visits')
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
    private readonly petsService: PetsService,
  ) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    const pet = this.petsService.findById(createVisitDto.petId);

    if (!pet) {
      throw new NotFoundException(UNEXIST_PET_ID_MSG);
    }

    return this.visitsService.create(createVisitDto);
  }

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(+id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitsService.remove(+id);
  }
}
