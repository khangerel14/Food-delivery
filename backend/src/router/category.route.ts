import { Router, Express } from "express";
import {
  createCategory,
  getCategory,
} from "../controller/category.controller.js";

const router = Router();

export default (app: Express) => {
  router.post("/", createCategory);

  router.get("/:id", getCategory);

  app.use("/api/categories", router);
};
