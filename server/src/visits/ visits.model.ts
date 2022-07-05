import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Pet} from "../pets/pets.model";

interface VisitCreationAttributes {
  date: Date;
}

@Table({tableName: 'Visits'})
export class Visit extends Model<Visit, VisitCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({type: DataType.DATE, allowNull: false})
  date: Date;

  @ForeignKey(() => Pet)
  petId: number;

  @BelongsTo(() => Pet, 'petId')
  pet: Pet;
}