import { Sequelize, DataTypes, Model, Association } from "sequelize";
import { User } from "./user";
import { Food } from "./food";

type CartAttributes = {
  id?: number;
  auth0Id: string;
  foodId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CartCreationAttributes extends Omit<CartAttributes, "id"> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public auth0Id!: string;
  public foodId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    user: Association<Cart, User>;
    foods: Association<Cart, Food>;
  };

  public static associate(models: { User: typeof User; Food: typeof Food }) {
    Cart.belongsTo(models.User, {
      foreignKey: "auth0Id",
      targetKey: "auth0Id",
      as: "user",
    });
    Cart.belongsTo(models.Food, { foreignKey: "foodId", as: "foods" });
  }
}

export const cartModel = (sequelize: Sequelize): typeof Cart => {
  Cart.init(
    {
      auth0Id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "auth0Id",
        },
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "foods",
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
