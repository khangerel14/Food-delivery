import { Op } from "sequelize";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../model/index.js";

dotenv.config();

const { User } = db;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name, picture, password } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { auth0Id },
      defaults: {
        auth0Id,
        email,
        name,
        picture,
        password,
      },
    });

    if (created) {
      console.log(`Шинэ хэрэглэгч: ${email}`);
    } else {
      console.log(`Өмнөн бүртгэгдсэн байна: ${email}`);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Амжилтгүй..." });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const user: string = req.body.user;
    const condition = user ? { email: { [Op.like]: `%${user}%` } } : {};

    const data = await User.findAll({ where: condition });
    res.status(200).send(data);
  } catch (err: unknown) {
    res.status(500).send({
      message: "Алдаа гарсан...",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const auth0Id: string = req.params.auth0Id;
  try {
    const num = await User.destroy({ where: { auth0Id } });
    if (num === 1) {
      res.status(200).send({ message: "Хэрэглэгч амжилттай устгагдлаа!" });
    } else {
      res
        .status(404)
        .send({ message: `id=${auth0Id} тай хэрэглэгч олдсонгүй!` });
    }
  } catch (err: unknown) {
    res.status(500).send({
      message: "Хэрэглэгч устгах үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
    });
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const num = await User.destroy({ where: {} });

    if (num > 0) {
      res.status(200).send({ message: "хэрэглэгч амжилттай устгагдлаа!" });
    } else {
      res.status(404).send({ message: "Устгах хэрэглэгч олдсонгүй!" });
    }
  } catch (err: unknown) {
    res.status(500).send({
      message: "Амжилтгүй...",
    });
  }
};
