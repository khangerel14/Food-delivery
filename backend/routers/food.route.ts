import { Router, Express } from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteAll,
  deleteFood,
} from "../controllers/food.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteFood);
  router.delete("/", deleteAll);

  app.use("/api/foods", router);
};
