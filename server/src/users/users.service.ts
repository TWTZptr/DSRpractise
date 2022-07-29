import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import {
  EMAIL_IS_NOT_UNIQUE_MSG,
  LOGIN_IS_NOT_UNIQUE_MSG,
  UNEXIST_USER_ID_MSG,
} from './constants';
import { RolesService } from '../roles/roles.service';
import { PasswordService } from '../password/password.service';
import { FindOptions } from 'sequelize/types';
import { PetsService } from '../pets/pets.service';
import { Pet } from '../pets/pets.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly rolesService: RolesService,
    private readonly passwordService: PasswordService,
    private readonly petsService: PetsService,
  ) {}

  async createClient(createUserDto: CreateUserDto): Promise<User> {
    await this.checkIsEmailAndLoginUnique(
      createUserDto.email,
      createUserDto.login,
    );

    const passwordHash = await this.passwordService.hash(
      createUserDto.password,
    );

    const role = await this.rolesService.findRoleByName('Client');
    return await this.userRepository.create({
      ...createUserDto,
      password: passwordHash,
      roleId: role.id,
    });
  }

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<User> {
    await this.checkIsLoginUnique(createDoctorDto.login);

    const passwordHash = await this.passwordService.hash(
      createDoctorDto.password,
    );
    const role = await this.rolesService.findRoleByName('Doctor');

    return await this.userRepository.create({
      ...createDoctorDto,
      password: passwordHash,
      roleId: role.id,
      email: '',
    });
  }

  findAll(options: FindOptions<User> = {}): Promise<User[]> {
    return this.userRepository.findAll(options);
  }

  async findById(id: number, options: FindOptions<User> = {}): Promise<User> {
    const user = await this.userRepository.findByPk(id, options);
    user.password = undefined;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const user = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (user && user.id !== id) {
        throw new ConflictException(EMAIL_IS_NOT_UNIQUE_MSG);
      }
    }

    if (updateUserDto.login) {
      const user = await this.userRepository.findOne({
        where: { login: updateUserDto.login },
      });
      if (user && user.id !== id) {
        throw new ConflictException(LOGIN_IS_NOT_UNIQUE_MSG);
      }
    }

    const [affectedCount] = await this.userRepository.update(updateUserDto, {
      where: { id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }

    return await this.findById(id, { include: 'role' });
  }

  async deleteById(id: number): Promise<void> {
    const affectedCount = await this.userRepository.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
  }

  async banById(id: number): Promise<User> {
    const affectedCount = await this.userRepository.update(
      { banned: true },
      { where: { id } },
    );
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
    return this.findById(id, { include: 'role' });
  }

  async unbanById(id: number): Promise<User> {
    const affectedCount = await this.userRepository.update(
      { banned: false },
      { where: { id } },
    );
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
    return this.findById(id, { include: 'role' });
  }

  async checkIsEmailAndLoginUnique(
    email: string,
    login: string,
  ): Promise<void> {
    const promises: Promise<void>[] = [
      this.checkIsEmailUnique(email),
      this.checkIsLoginUnique(login),
    ];

    await Promise.all(promises);
  }

  async checkIsEmailUnique(email: string): Promise<void> {
    const userWithSpecifiedEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userWithSpecifiedEmail) {
      throw new ConflictException(EMAIL_IS_NOT_UNIQUE_MSG);
    }
  }

  async checkIsLoginUnique(login: string): Promise<void> {
    const userWithSpecifiedLogin = await this.userRepository.findOne({
      where: {
        login,
      },
    });

    if (userWithSpecifiedLogin) {
      throw new ConflictException(LOGIN_IS_NOT_UNIQUE_MSG);
    }
  }

  findByLogin(login: string): Promise<User> {
    return this.userRepository.findOne({ where: { login }, include: ['role'] });
  }

  async getAllInformation(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    user.password = undefined;
    return user;
  }

  getAllPetsByUserId(id: number): Promise<Pet[]> {
    return this.petsService.findByOwnerId(id);
  }
}
