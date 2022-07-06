import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UNEXIST_USER_ID_MSG } from './constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [affectedCount] = await this.userRepository.update(updateUserDto, {
      where: { id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }

    return await this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    const affectedCount = await this.userRepository.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
  }
}
