import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './visits.model';
import { UNEXIST_VISIT_ID_MSG } from './constants';
import { UserPayload } from '../users/user-payload.type';

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

  async remove(id: number, user: UserPayload): Promise<void> {
    const visitToRemove = await this.visitRepository.findByPk(id, {
      include: { all: true },
    });
    if (!visitToRemove) {
      throw new NotFoundException(UNEXIST_VISIT_ID_MSG);
    }

    const petOwner = await visitToRemove.pet.$get('owner');

    if (petOwner.id !== user.id && user.role !== 'Admin') {
      throw new ForbiddenException();
    }

    await visitToRemove.destroy();
  }
}
