import { Router, Express } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth";

const router = Router();

export default (app: Express) => {
  router.post("/add", addToCart);
  router.post("/remove", removeFromCart);
  router.get("/get", getCart);

  app.use("/api/cart", router);
};
