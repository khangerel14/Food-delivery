import {
  create,
  findAll,
  findOne,
  update,
  deleteUser,
  deleteAll,
} from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

export default (app) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteUser);
  router.delete("/", deleteAll);

  app.use("/api/users", router);
};
