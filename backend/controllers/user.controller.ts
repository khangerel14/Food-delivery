import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.js";

dotenv.config();

const { User } = db;

export const create = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res
        .status(400)
        .send({ message: "All fields are required: email, name, password." });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).send({ message: "User already exists with this email." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, name, password: hashedPassword };
    const data = await User.create(user);

    const { password: _, ...userData } = data.get({ plain: true });

    res.status(201).send({
      message: "User created successfully",
      user: userData,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Some error occurred";
    res.status(500).send({
      message: errorMessage,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send({ message: "User not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid email or password." });
      return;
    }

    const { password: _, ...userData } = user.get({ plain: true });

    const createToken = (id: number): string => {
      return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
    };

    const token = createToken(user.id);

    res.status(200).send({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (err) {
    res.status(500).send({
      message:
        (err as Error)?.message || "Some error occurred while logging in.",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const user: string = req.body.user;
    const condition = user ? { email: { [Op.like]: `%${user}%` } } : {};

    const data = await User.findAll({ where: condition });
    res.status(200).send(data);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Some error occurred";
    res.status(500).send({
      message: errorMessage,
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const data = await User.findByPk(id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: `Cannot find User with id=${id}.` });
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error retrieving User with id=" + id;
    res.status(500).send({
      message: errorMessage,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const num = await User.destroy({ where: { id } });
    if (num === 1) {
      res.status(200).send({ message: "User was deleted successfully!" });
    } else {
      res
        .status(404)
        .send({ message: `Cannot delete User with id=${id}. User not found!` });
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Couldn't delete User with id=" + id;
    res.status(500).send({
      message: errorMessage,
    });
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    const num = await User.destroy({ where: {}, truncate: false });
    res
      .status(200)
      .send({ message: `${num} Users were deleted successfully.` });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Couldn't delete all Users.";
    res.status(500).send({
      message: errorMessage,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { email, name } = req.body;

  if (!email) {
    res.status(400).send({ message: "Email is required." });
    return;
  }

  try {
    const [num] = await User.update({ email, name }, { where: { id } });

    if (num === 1) {
      res.status(200).send({ message: "User was updated successfully!" });
    } else {
      res
        .status(404)
        .send({ message: `Cannot update User with id=${id}. User not found!` });
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error updating User with id=" + id;
    res.status(500).send({
      message: errorMessage,
    });
  }
};
