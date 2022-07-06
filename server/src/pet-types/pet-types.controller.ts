import { Controller, Get, Param } from '@nestjs/common';
import { PetTypesService } from './pet-types.service';

@Controller('pet-types')
export class PetTypesController {
  constructor(private readonly petTypesService: PetTypesService) {}
  @Get()
  findAll() {
    return this.petTypesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.petTypesService.findById(+id);
  }
}
