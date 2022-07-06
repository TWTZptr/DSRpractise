import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { MAX_PET_TYPE_NAME_LENGTH } from './constants';
import { Pet } from '../pets/pets.model';

interface PetTypeCreationAttributes {
  name: string;
}

@Table({ tableName: 'PetTypes' })
export class PetType extends Model<PetType, PetTypeCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(MAX_PET_TYPE_NAME_LENGTH),
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Pet, 'petTypeId')
  pets: Pet[];
}
