import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: "Users",
  modelName: "Users",
})
class Users extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  //   @Column({
  //     type: DataType.STRING,
  //     allowNull: false,
  //   })
  //   profileImage!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}

export default Users;
