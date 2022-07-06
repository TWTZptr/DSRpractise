import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './ visits.model';
import { UNEXIST_VISIT_ID_MSG } from './constants';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private visitRepository: typeof Visit) {}

  create(createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitRepository.create(createVisitDto);
  }

  findAll(): Promise<Visit[]> {
    return this.visitRepository.findAll();
  }

  findById(id: number): Promise<Visit> {
    return this.visitRepository.findByPk(id);
  }

  async update(id: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const [affectedCount] = await this.visitRepository.update(updateVisitDto, {
      where: { id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_VISIT_ID_MSG);
    }

    return await this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const affectedCount = await this.visitRepository.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_VISIT_ID_MSG);
    }
  }
}
