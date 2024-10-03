import { Sequelize, DataTypes, Model, Optional } from "sequelize";

type CategoryAttributes = {
  id?: number;
  name: string;
  parentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public parentId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public parentCategory?: Category;
  public children?: Category[];
}

export const categoryModel = (sequelize: Sequelize): typeof Category => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
    }
  );

  return Category;
};
