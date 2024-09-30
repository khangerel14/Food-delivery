import { Request, Response } from "express";
import db from "../models/index.js";

const { Cart, User } = db;

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { auth0Id, foodId, quantity } = req.body;

    const user = await User.findOne({ where: { auth0Id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [cartItem, created] = await Cart.findOrCreate({
      where: { auth0Id, foodId },
      defaults: { auth0Id, foodId, quantity },
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
    const { auth0Id, foodId } = req.params;

    if (!auth0Id || !foodId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartItem = await Cart.findOne({ where: { auth0Id, foodId } });
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

export const deleteAllCartItems = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.params; // Get auth0Id from request parameters

    // Delete all items in the cart for the specified user
    const deletedCount = await Cart.destroy({
      where: { auth0Id }, // Filter by auth0Id
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No cart items found for this user" });
    }

    return res
      .status(200)
      .json({ message: "All cart items deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getCart = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.params;

    if (!auth0Id) {
      return res.status(400).json({ error: "Missing auth0Id" });
    }

    const cartItems = await Cart.findAll({
      where: { auth0Id },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "No cart items found" });
    }

    console.log("Fetched cart items:", cartItems);

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
