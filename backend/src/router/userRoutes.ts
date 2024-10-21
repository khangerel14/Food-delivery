import { Router, Express } from "express";
import { getProfile, loginUser, logOut } from "../controller/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

export default (app: Express) => {
  router.post("/login", loginUser);
  router.post("/logOut", logOut);
  router.get("/profile", authenticateToken, getProfile);

  app.use("/api", router);
};
