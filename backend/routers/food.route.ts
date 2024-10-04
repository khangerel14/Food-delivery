import { Router, Express } from "express";
import {
  create,
  findAll,
  findMultiple,
  deleteFood,
  getAllFood,
} from "../controllers/food.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/all", getAllFood);
  router.get("/multiple", findMultiple);
  router.delete("/:id", deleteFood);

  app.use("/api/foods", router);
};
