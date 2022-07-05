import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {MAX_EMAIL_LENGTH, MAX_LOGIN_LENGTH, MAX_USERNAME_LENGTH} from "./constants";
import {Pet} from "../pets/pets.model";

interface UserCreationAttributes {
  login: string;
  email: string;
  password: string;
  name: string;
  roleId: number;
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({type: DataType.STRING(MAX_LOGIN_LENGTH), allowNull: false})
  login: string;

  @Column({type: DataType.STRING(MAX_EMAIL_LENGTH), allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.STRING(MAX_USERNAME_LENGTH), allowNull: false})
  name: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'role_id' })
  roleId: number;

  @BelongsTo(() => Role, 'roleId')
  role: Role;

  @HasMany(() => Pet, 'ownerId')
  pets: Pet[];
}