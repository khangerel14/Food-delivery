import { Router, Express } from "express";
import {
  addToCart,
  deleteAllCartItems,
  getCart,
  removeFromCart,
} from "../controller/cart.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", addToCart);

  router.get("/", getCart);

  router.delete("/:auth0Id/:foodId", removeFromCart);

  router.delete("/:auth0Id", deleteAllCartItems);

  app.use("/api/cart", router);
};
