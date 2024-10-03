import { Router, Express } from "express";
import {
  addToCart,
  deleteAllCartItems,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", addToCart);

  router.delete("/:auth0Id/:foodId", removeFromCart);

  router.delete("/:auth0Id", deleteAllCartItems);

  app.use("/api/cart", router);
};
