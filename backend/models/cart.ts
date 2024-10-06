import { Sequelize, DataTypes, Model, Association } from "sequelize";
import { User } from "./user";
import { Food } from "./food";
import { Order } from "./order";

type CartAttributes = {
  id?: number;
  auth0Id: string;
  foodId: number;
  quantity: number;
  orderId?: number; // Add this field for the association with Order
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
  public orderId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    user: Association<Cart, User>;
    foods: Association<Cart, Food>;
    order: Association<Cart, Order>;
  };

  public static associate(models: {
    User: typeof User;
    Food: typeof Food;
    Order: typeof Order;
  }) {
    Cart.belongsTo(models.Order, { foreignKey: "orderId", as: "orders" });
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
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
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
