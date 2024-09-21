import { Op } from "sequelize";
import db from "../models/index.js";

const { Order } = db;

export const create = async (req, res) => {
  try {
    const { email, khoroo, district, phoneNumber } = req.body;
    const order = { email, khoroo, district, phoneNumber };

    if (!email || !khoroo || !district || !phoneNumber) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const data = await Order.create(order);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the food.",
    });
  }
};

export const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Order.destroy({
      where: { id: id },
    });
    if (num === 1) {
      res.status(200).send({
        message: "Food was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Food with id=${id}. Food not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Couldn't delete Order with id=" + id,
    });
  }
};
