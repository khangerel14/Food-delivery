import { Sequelize } from "sequelize";

export const userModel = (sequelize) => {
  const { DataTypes } = Sequelize;

  return sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
