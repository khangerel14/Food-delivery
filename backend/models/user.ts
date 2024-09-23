import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id?: number;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userModel = (sequelize: Sequelize): typeof User => {
  try {
    User.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      }
    );

    return User;
  } catch (error) {
    console.error("Error defining the User model:", error);
    throw error;
  }
};
