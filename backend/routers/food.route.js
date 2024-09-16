import {
  create,
  findAll,
  findOne,
  update,
  deleteAll,
  deleteFood,
} from "../controllers/food.controller.js";
import { Router } from "express";

const router = Router();

export default (app) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteFood);
  router.delete("/", deleteAll);

  app.use("/api/foods", router);
};
