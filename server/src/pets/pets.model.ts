import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  DEFAULT_PET_INFO,
  MAX_BREED_LENGTH,
  MAX_PET_INFO_LENGTH,
  MAX_PET_NAME_LENGTH,
} from './constants';
import { User } from '../users/users.model';
import { PetType } from '../pet-types/pet-types.model';
import { Visit } from '../visits/visits.model';

interface PetCreationAttributes {
  breed: string;
  name: string;
  ownerId: number;
  typeId: number;
}

@Table({ tableName: 'Pets' })
export class Pet extends Model<Pet, PetCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(MAX_BREED_LENGTH), allowNull: false })
  breed: string;

  @Column({ type: DataType.STRING(MAX_PET_NAME_LENGTH), allowNull: false })
  name: string;

  @Column({
    type: DataType.STRING(MAX_PET_INFO_LENGTH),
    allowNull: false,
    defaultValue: DEFAULT_PET_INFO,
  })
  info: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'owner_id' })
  ownerId: number;

  @ForeignKey(() => PetType)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'type_id' })
  typeId: number;

  @BelongsTo(() => User, 'ownerId')
  owner: User;

  @BelongsTo(() => PetType, 'typeId')
  petType: PetType;

  @HasMany(() => Visit, 'petId')
  visits: Visit[];
}
