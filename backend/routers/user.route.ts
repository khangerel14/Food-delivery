import {
  createUser,
  findAll,
  deleteUser,
} from "../controllers/user.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
  router.post("/", createUser);
  router.get("/", findAll);
  router.delete("/:id", deleteUser);

  app.use("/api/users", router);
};
