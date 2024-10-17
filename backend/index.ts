import express, { Express } from "express";
import { connection } from "./src/postgresql.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./src/routers/user.route.js";
import foodRoutes from "./src/routers/food.route.js";
import orderRoutes from "./src/routers/order.route.js";
import cartRoutes from "./src/routers/cart.route.js";
import categoryRoute from "./src/routers/category.route.js";
import qpayRoutes from "./src/routers/qpay.route.js";
import { createAdmin } from "./src/admin/signIn.controller.js";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/qpay", qpayRoutes);

createAdmin();

const PORT = 8000;

connection();

userRoutes(app);
foodRoutes(app);
orderRoutes(app);
cartRoutes(app);
categoryRoute(app);

app.listen(PORT, "localhost", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
