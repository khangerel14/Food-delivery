import { Request, Response } from "express";
import db from "../models/index.js";

const { Cart, User } = db;

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { auth0Id, foodId, quantity, name } = req.body;

    const user = await User.findOne({ where: { auth0Id } });
    if (!user) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    const [cartItem, created] = await Cart.findOrCreate({
      where: { auth0Id, foodId },
      defaults: { auth0Id, foodId, quantity, name },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    return res.status(500).json({ error: "Алдааа гарлаа!!!" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { auth0Id, foodId } = req.params;

    if (!auth0Id || !foodId) {
      return res.status(400).json({ error: "Мэдээлэл алга байна." });
    }

    const cartItem = await Cart.findOne({ where: { auth0Id, foodId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Бүтээгдхүүн олдсонгүй." });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: "Бүтээгдхүүн амжилттай устлаа." });
  } catch (error) {
    return res.status(500).json({ error: "Алдаа!!!" });
  }
};

export const deleteAllCartItems = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.params;

    const deletedCount = await Cart.destroy({
      where: { auth0Id },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Хэрэглэгчид захиалга үүсээгүй байна." });
    }

    return res.status(200).json({ message: "Карт хоосон боллоо." });
  } catch (error) {
    return res.status(500).json({ error: "Алдаа гарсан." });
  }
};
