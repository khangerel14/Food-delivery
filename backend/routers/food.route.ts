import { Router, Express } from "express";
import {
  create,
  findAll,
  findMultiple,
  update,
  deleteAll,
  deleteFood,
} from "../controllers/food.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/multiple", findMultiple);
  router.put("/:id", update);
  router.delete("/:id", deleteFood);
  router.delete("/", deleteAll);

  app.use("/api/foods", router);
};
