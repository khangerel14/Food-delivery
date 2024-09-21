import { Sequelize } from "sequelize";

export const orderModel = (sequelize) => {
  const { DataTypes } = Sequelize;

  return sequelize.define(
    "order",
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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
