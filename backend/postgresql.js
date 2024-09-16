import { Sequelize } from "sequelize";
import { userModel } from "./models/user.js";
import { foodModel } from "./models/food.js";

export const connection = async () => {
  const sequelize = new Sequelize("sql", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",
  });
  let User = null;
  let Food = null;
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    User = userModel(sequelize);
    Food = foodModel(sequelize);
    await sequelize.sync();
    console.log("Data table created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
