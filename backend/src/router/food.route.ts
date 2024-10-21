import { Router, Express } from "express";
import {
  create,
  findAll,
  findMultiple,
  deleteFood,
  getAllFood,
} from "../controller/food.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

export default (app: Express) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/all", getAllFood);

  router.get("/adminFoods", authenticateToken, getAllFood);

  router.get("/multiple", findMultiple);
  router.delete("/:id", deleteFood);

  app.use("/api/foods", router);
};
