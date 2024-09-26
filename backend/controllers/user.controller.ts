import { Op } from "sequelize";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../models/index.js";

dotenv.config();

const { User } = db;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name, picture } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { auth0Id },
      defaults: {
        auth0Id,
        email,
        name,
        picture,
      },
    });

    if (created) {
      console.log(`New user created: ${email}`);
    } else {
      console.log(`Existing user found: ${email}`);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
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
