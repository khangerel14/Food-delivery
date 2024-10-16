import { Sequelize, DataTypes, Model, Optional, Association } from "sequelize";
import { User } from "./user";
import { Food } from "./food";
import { Order } from "./order";

type CartAttributes = {
  id?: number;
  auth0Id: string;
  foodId: number;
  quantity: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public auth0Id!: string;
  public foodId!: number;
  public quantity!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    user: Association<Cart, User>;
    food: Association<Cart, Food>;
    order: Association<Cart, Order>;
  };

  public static associate(models: {
    User: typeof User;
    Food: typeof Food;
    Order: typeof Order;
  }) {
    Cart.belongsTo(models.User, { foreignKey: "auth0Id", as: "user" });
    Cart.belongsTo(models.Food, { foreignKey: "foodId", as: "food" });
    Cart.belongsTo(models.Order, { foreignKey: "auth0Id", as: "orders" });
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
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
