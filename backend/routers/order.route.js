import { create, deleteOrder } from "../controllers/order.controller.js";
import { Router } from "express";

const router = Router();

export default (app) => {
  router.post("/", create);
  router.delete("/:id", deleteOrder);

  app.use("/api/orders", router);
};
