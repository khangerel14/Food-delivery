import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface OrderAttributes {
  id?: number;
  email: string;
  district:
    | "Хан уул"
    | "Чингэлтэй"
    | "Баянзүрх"
    | "Сонгино хайрхан"
    | "Багануур"
    | "Сүхбаатар";
  khoroo: string;
  phoneNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public email!: string;
  public district!:
    | "Хан уул"
    | "Чингэлтэй"
    | "Баянзүрх"
    | "Сонгино хайрхан"
    | "Багануур"
    | "Сүхбаатар";
  public khoroo!: string;
  public phoneNumber!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const orderModel = (sequelize: Sequelize): typeof Order => {
  try {
    Order.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        district: {
          type: DataTypes.ENUM(
            "Хан уул",
            "Чингэлтэй",
            "Баянзүрх",
            "Сонгино хайрхан",
            "Багануур",
            "Сүхбаатар"
          ),
          allowNull: false,
        },
        khoroo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
      }
    );

    return Order;
  } catch (error) {
    console.error("Error defining the Order model:", error);
    throw error;
  }
};
