import { Sequelize } from "sequelize";
import { userModel } from "./model/user.js";
import { foodModel } from "./model/food.js";
import { orderModel } from "./model/order.js";
import { cartModel } from "./model/cart.js";

export const connection = async (): Promise<void> => {
  const sequelize = new Sequelize("sql", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",
  });

  let User: ReturnType<typeof userModel> | null = null;
  let Food: ReturnType<typeof foodModel> | null = null;
  let Order: ReturnType<typeof orderModel> | null = null;
  let Cart: ReturnType<typeof cartModel> | null = null;

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User = userModel(sequelize);
    Food = foodModel(sequelize);
    Order = orderModel(sequelize);
    Cart = cartModel(sequelize);

    await sequelize.sync();
    console.log("Data table created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
