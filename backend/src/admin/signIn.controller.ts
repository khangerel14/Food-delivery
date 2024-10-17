import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const { User } = db;

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        auth0Id: user.auth0Id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
