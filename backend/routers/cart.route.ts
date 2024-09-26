import { Router, Express } from "express";
import {
  addToCart,
  getCart,
  removeFromcart,
} from "../controllers/cart.controller";
import authMiddleware from "../middleware/auth";

const router = Router();

export default (app: Express) => {
  router.post("/add", addToCart);
  router.post("/remove", removeFromcart);
  router.get("/get", getCart);

  app.use("/api/cart", router);
};
