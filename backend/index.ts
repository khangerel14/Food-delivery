import express, { Express } from "express";
import { connection } from "./postgresql.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routers/user.route.js";
import foodRoutes from "./routers/food.route.js";
import orderRoutes from "./routers/order.route.js";
import cartRoutes from "./routers/cart.route.js";
import categoryRoute from "./routers/category.route.js";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
