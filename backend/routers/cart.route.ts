import { Router, Express } from "express";
import {
  addToCart,
  deleteAllCartItems,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", addToCart);

  router.delete("/:auth0Id/:foodId", removeFromCart);

  router.delete("/:auth0Id", deleteAllCartItems);

  router.get("/:auth0Id", getCart);

  app.use("/api/cart", router);
};
