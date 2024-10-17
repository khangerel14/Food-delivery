import dotenv from "dotenv";
import db from "../model/index.js"; // Ensure the correct path to your models
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomJwtPayload } from "../types/express.js"; // Ensure this type is defined in your project

dotenv.config();

const { User } = db;

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as CustomJwtPayload)?.id; // Extract user ID from JWT payload

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(userId); // Fetch user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Respond with user data
  } catch (error) {
    console.error("Error fetching profile:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Create admin account
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
    const user = await User.findOne({ where: { email } });

    console.log("User object:", JSON.stringify(user, null, 2));

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Provided password:", password);
    console.log("User's hashed password:", user.password);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
