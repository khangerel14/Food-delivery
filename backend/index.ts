import express, { Express } from "express";
import { connection } from "./src/postgresql.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./src/router/user.route.js";
import foodRoutes from "./src/router/food.route.js";
import orderRoutes from "./src/router/order.route.js";
import cartRoutes from "./src/router/cart.route.js";
import categoryRoute from "./src/router/category.route.js";
import qpayRoutes from "./src/router/qpay.route.js";
import { createAdmin } from "./src/controller/userController.js";
import userRoutess from "./src/router/userRoutes.js";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createAdmin();

const PORT = 8000;

connection();

app.use("/api/qpay", qpayRoutes);
userRoutes(app);
foodRoutes(app);
orderRoutes(app);
cartRoutes(app);
categoryRoute(app);
userRoutess(app);

app.listen(PORT, "localhost", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
