import { Request, Response } from "express";
import { getSession } from "@auth0/nextjs-auth0";
import db from "../models/index.js";

const { User, Cart, Food } = db;

export const addToCart = async (req: Request, res: Response) => {
  try {
    const session = await getSession(req, res);

    if (!session || !session.user) {
      console.error("Session or session.user is null:", session);
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { sub: auth0Id } = session.user;

    const user = await User.findOne({ where: { auth0Id } });
    if (!user) {
      console.error("User not found with auth0Id:", auth0Id);
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;
    const { foodId, quantity } = req.body;

    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, foodId },
      defaults: { userId, foodId, quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { sub: auth0Id } = session.user;

    const user = await User.findOne({ where: { auth0Id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ error: "Invalid foodId" });
    }

    const cartItem = await Cart.findOne({ where: { userId, foodId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { sub: auth0Id } = session.user;

    const user = await User.findOne({ where: { auth0Id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Food, as: "food" }],
    });

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
