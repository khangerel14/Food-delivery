import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { categoryModel } from "./category";

type FoodAttributes = {
  id?: number;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  assessment: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface FoodCreationAttributes extends Optional<FoodAttributes, "id"> {}

export class Food
  extends Model<FoodAttributes, FoodCreationAttributes>
  implements FoodAttributes
{
  public id!: number;
  public imgUrl!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public assessment!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const foodModel = (sequelize: Sequelize): typeof Food => {
  Food.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      assessment: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "foods",
      timestamps: true,
    }
  );

  return Food;
};
