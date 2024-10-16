import {
  createUser,
  findAll,
  deleteUser,
} from "../controller/user.controller.js";
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
  router.post("/", createUser);
  router.get("/", findAll);
  router.delete("/:auth0Id", deleteUser);
  router.delete("/", deleteUser);

  app.use("/api/users", router);
};
