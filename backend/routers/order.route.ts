import { create, deleteOrder } from "../controllers/order.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
  router.post("/", create);
  router.delete("/:id", deleteOrder);

  app.use("/api/orders", router);
};
