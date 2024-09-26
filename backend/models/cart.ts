import { Sequelize, DataTypes, Model, Association } from "sequelize";
import { User } from "./user";
import { Food } from "./food";

interface CartAttributes {
  id?: number;
  userId: number;
  foodId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartCreationAttributes extends Omit<CartAttributes, "id"> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public userId!: number;
  public foodId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    user: Association<Cart, User>;
    food: Association<Cart, Food>;
  };

  public static associate(models: { User: typeof User; Food: typeof Food }) {
    Cart.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Cart.belongsTo(models.Food, { foreignKey: "foodId", as: "food" });
  }
}

export const cartModel = (sequelize: Sequelize): typeof Cart => {
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "food",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      timestamps: true,
    }
  );

  return Cart;
};
