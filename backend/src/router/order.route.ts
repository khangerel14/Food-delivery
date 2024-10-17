import { createOrder, deleteOrder } from "../controller/order.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
  router.post("/", createOrder);
  router.delete("/:id", deleteOrder);

  app.use("/api/orders", router);
};
