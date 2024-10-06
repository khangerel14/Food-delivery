import { Sequelize } from "sequelize";
import { userModel } from "./user.js";
import { foodModel } from "./food.js";
import { orderModel } from "./order.js";
import { cartModel } from "./cart.js";
import { categoryModel } from "./category.js";

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
  Category: categoryModel(sequelize),
};

const setupAssociations = () => {
  db.Category.hasMany(db.Food, { foreignKey: "categoryId", as: "foods" });
  db.Food.belongsTo(db.Category, {
    foreignKey: "categoryId",
    as: "categories",
  });

  db.User.hasMany(db.Order, { foreignKey: "userId" });
  db.Order.belongsTo(db.User, { foreignKey: "userId" });

  db.Cart.belongsTo(db.Order, {
    foreignKey: "orderId",
    as: "order",
  });
};

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    setupAssociations();

    await sequelize.sync();
    console.log("Data tables created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncModels();

export default db;
