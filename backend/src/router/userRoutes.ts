import { Router, Express } from "express";
import { getProfile, loginUser } from "../controller/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

export default (app: Express) => {
  router.post("/login", loginUser); // Login route

  router.get("/profile", authenticateToken, getProfile); // Route to get user profile

  app.use("/api", router);
};
