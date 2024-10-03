import { Router, Express } from "express";
import {
  createCategory,
  getAllCategory,
  getCategory,
} from "../controllers/category.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", createCategory);

  router.get("/:id", getCategory);

  router.get("/", getAllCategory);

  app.use("/api/categories", router);
};
