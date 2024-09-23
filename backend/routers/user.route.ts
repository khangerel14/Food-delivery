import {
  create,
  findAll,
  findOne,
  update,
  deleteUser,
  deleteAll,
  loginUser,
} from "../controllers/user.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express): void => {
  router.post("/", create);
  router.post("/logIn", loginUser);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteUser);
  router.delete("/", deleteAll);

  app.use("/api/users", router);
};
