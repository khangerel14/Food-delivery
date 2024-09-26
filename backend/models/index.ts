import { Sequelize } from "sequelize";
import { userModel, User } from "./user.js";
import { foodModel, Food } from "./food.js";
import { orderModel, Order } from "./order.js";
import { cartModel, Cart } from "./cart.js";

const sequelize = new Sequelize("sql", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const db = {
  Sequelize,
  sequelize,
  User: userModel(sequelize),
  Food: foodModel(sequelize),
  Order: orderModel(sequelize),
  Cart: cartModel(sequelize),
};

const syncModels = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Data tables created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncModels();

export default db;