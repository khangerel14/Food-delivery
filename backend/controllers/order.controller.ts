import { Request, Response } from "express";
import db from "../models/index.js";

const { Order, User } = db;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, khoroo, district, phoneNumber } = req.body;

    if (!email || !khoroo || !district || !phoneNumber) {
      return res.status(400).send({ message: "Мэдээлэл дутуу байна." });
    }

    const order = { email, khoroo, district, phoneNumber };

    const data = await Order.create(order);
    return res.status(201).send(data);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).send({
      message: (error as Error).message || "Захиалга үүсгэхэд алдаа гарсан.",
    });
  }
};
export const deleteOrder = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const num = await Order.destroy({ where: { id } });
    if (num === 1) {
      res.status(200).send({
        message: "Захиалга амжилттай устгагдлаа!",
      });
    } else {
      res.status(404).send({
        message: `Захиалга олдсонгүй id=${id}!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Захиалга устгахад алдаа гарлаа id=" + id,
    });
  }
};

export const getLastOrder = async (req: Request, res: Response) => {
  try {
    const lastOrder = await Order.findOne({
      order: [["id", "DESC"]],
    });

    if (!lastOrder) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(lastOrder);
  } catch (error) {
    console.error("Error retrieving last order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
