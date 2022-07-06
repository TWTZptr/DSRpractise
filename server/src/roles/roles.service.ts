import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  findById(id: number): Promise<Role> {
    return this.roleRepository.findByPk(id);
  }
}
