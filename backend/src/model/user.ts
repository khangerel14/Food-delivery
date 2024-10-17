import { Sequelize, DataTypes, Model, Optional, Association } from "sequelize";
import { Order } from "./order";

type UserAttributes = {
  id?: number;
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public auth0Id!: string;
  public email!: string;
  public name!: string;
  public picture?: string;
  public password!: string;
  public role?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    orders: Association<User, Order>;
  };

  public static associate(models: any) {
    User.hasMany(models.Order, {
      foreignKey: "auth0Id",
      as: "orders",
    });
  }
}

export const userModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      auth0Id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user",
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
};
