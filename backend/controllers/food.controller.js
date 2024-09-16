import { Op } from "sequelize";
import db from "../models/index.js";

const { Food } = db;

export const create = async (req, res) => {
  try {
    const { imgUrl, name, description, price, assessment, menu } = req.body;
    const food = { imgUrl, name, description, price, assessment, menu };

    if (
      !imgUrl ||
      !name ||
      !description ||
      price === undefined ||
      assessment === undefined ||
      menu === undefined
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const data = await Food.create(food);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the food.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const food = req.body.food;
    const condition = food ? { name: { [Op.like]: `%${food}%` } } : null;

    const data = await Food.findAll({ where: condition });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving foods.",
    });
  }
};

export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Food.findByPk(id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Food with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Food with id=" + id,
    });
  }
};

export const deleteFood = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Food.destroy({
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
  } catch (err) {
    res.status(500).send({
      message: "Couldn't delete Food with id=" + id,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const num = await Food.destroy({
      where: {},
      truncate: false,
    });
    res.status(200).send({
      message: `${num} Foods were deleted successfully.`,
    });
  } catch (err) {
    res.status(500).send({
      message: "Couldn't delete all Foods.",
    });
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const { imgUrl, name, description, price, assessment, menu } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  try {
    const [num] = await Food.update(
      { imgUrl, name, description, price, assessment, menu },
      { where: { id: id } }
    );

    if (num === 1) {
      res.status(200).send({ message: "Food was updated successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot update Food with id=${id}. Food not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Food with id=" + id,
    });
  }
};
