import { Sequelize } from "sequelize";

export const foodModel = (sequelize) => {
  const { DataTypes } = Sequelize;

  return sequelize.define(
    "food",
    {
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      assessment: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      menu: {
        type: DataTypes.ENUM("Breakfast", "Soup", "Main Course", "Dessert"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
