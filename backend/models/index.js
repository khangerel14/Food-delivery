import { Sequelize } from "sequelize";
import { userModel } from "./user.js";
import { foodModel } from "./food.js";

const sequelize = new Sequelize("sql", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const db = {
  Sequelize,
  sequelize,
  User: userModel(sequelize),
  Food: foodModel(sequelize),
};

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync(); // Sync all models
    console.log("Data tables created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncModels();

export default db;
