import dotenv from "dotenv";
import db from "../model/index.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { CustomJwtPayload } from "../types/express.js";

dotenv.config();

const { User } = db;

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const getProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (req.user && typeof req.user !== "string") {
      const userId = req.user.id;
      const userProfile = await User.findOne({ where: { auth0Id: userId } });

      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(userProfile);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "admin@test.com" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin", 10);
      await User.create({
        auth0Id: "auth0|24e4475y334262efb9d08056",
        email: "admin@test.com",
        name: "Admin",
        picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jYrE-vLTrbz7UUlPyPCYg-ZK0R5BUXVEGg&s",
        role: "admin",
        password: hashedPassword,
      });
      console.log("Admin account created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "auth0Id",
        "email",
        "name",
        "picture",
        "role",
        "password",
        "createdAt",
        "updatedAt",
      ],
    });

    const userData = user ? user.get({ plain: true }) : null;

    console.log("User object:", JSON.stringify(userData, null, 2));

    if (!userData || !userData.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: userData.auth0Id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const logOut = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
