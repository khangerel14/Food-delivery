import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

export default (app) => {
  router.post("/add", authMiddleware, addToCart);
  router.get("/get", authMiddleware, getCart);
  router.delete("/remove", authMiddleware, removeFromCart);

  app.use("/api/orders/", router);
};
