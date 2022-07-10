import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
  UNEXIST_ROLE_ID_MSG,
  UNEXIST_USER_ID_MSG,
} from './constants';
import { RolesService } from '../roles/roles.service';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly rolesService: RolesService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkIsEmailAndLoginUnique(
      createUserDto.email,
      createUserDto.login,
    );

    const role = await this.rolesService.findById(createUserDto.roleId);
    if (!role) {
      throw new BadRequestException(UNEXIST_ROLE_ID_MSG);
    }

    if (role.name === 'Admin') {
      throw new ForbiddenException();
    }

    const passwordHash = await this.passwordService.hash(
      createUserDto.password,
    );

    return this.userRepository.create({
      ...createUserDto,
      password: passwordHash,
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      await this.checkIsEmailUnique(updateUserDto.email);
    }

    if (updateUserDto.login) {
      await this.checkIsLoginUnique(updateUserDto.login);
    }

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

  async banById(id: number): Promise<void> {
    const affectedCount = await this.userRepository.update(
      { banned: true },
      { where: { id } },
    );
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
  }

  async unbanById(id: number): Promise<void> {
    const affectedCount = await this.userRepository.update(
      { banned: false },
      { where: { id } },
    );
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_USER_ID_MSG);
    }
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
    return this.userRepository.findOne({ where: { login } });
  }
}
