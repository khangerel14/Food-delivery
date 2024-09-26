import {
  createUser,
  findAll,
  findOne,
  update,
  deleteUser,
} from "../controllers/user.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
  router.post("/", createUser);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteUser);

  app.use("/api/users", router);
};
