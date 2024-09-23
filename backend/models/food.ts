import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface FoodAttributes {
  id?: number;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  assessment: number;
  menu: "Breakfast" | "Soup" | "Main Course" | "Dessert";
  createdAt?: Date;
  updatedAt?: Date;
}

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
  public menu!: "Breakfast" | "Soup" | "Main Course" | "Dessert";

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
      menu: {
        type: DataTypes.ENUM("Breakfast", "Soup", "Main Course", "Dessert"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "food",
      timestamps: true,
    }
  );

  return Food;
};
