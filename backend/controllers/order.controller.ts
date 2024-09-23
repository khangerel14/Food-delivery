import { Request, Response } from "express";
import db from "../models/index.js";

const { Order } = db;

export const create = async (req: Request, res: Response) => {
  try {
    const { email, khoroo, district, phoneNumber } = req.body;
    const order = { email, khoroo, district, phoneNumber };

    if (!email || !khoroo || !district || !phoneNumber) {
      res.status(400).send({ message: "All fields are required." });
      return;
    }

    const data = await Order.create(order);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message:
        (error as Error).message ||
        "Some error occurred while creating the order.",
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const num = await Order.destroy({ where: { id } });
    if (num === 1) {
      res.status(200).send({
        message: "Order was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Order with id=${id}. Order not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Couldn't delete Order with id=" + id,
    });
  }
};
