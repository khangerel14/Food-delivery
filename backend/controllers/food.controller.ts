import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../models/index.js";

const { Food } = db;

export const create = async (req: Request, res: Response) => {
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
      res.status(400).send({ message: "All fields are required." });
      return;
    }

    const data = await Food.create(food);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message:
        (error as Error)?.message ||
        "Some error occurred while creating the food.",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 4;
    const offset: number = (page - 1) * limit;

    const food: string = req.query.food as string;
    const condition = food ? { name: { [Op.iLike]: `%${food}%` } } : undefined;

    const data = await Food.findAll({
      where: condition,
      limit: limit,
      offset: offset,
    });

    const totalCount = await Food.count({ where: condition });

    res.status(200).send({
      success: true,
      page,
      perPage: limit,
      totalCount,
      foods: data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message:
        (error as Error)?.message ||
        "Some error occurred while retrieving foods.",
    });
  }
};

export const findMultiple = async (req: Request, res: Response) => {
  try {
    const ids =
      req.query.ids
        ?.toString()
        .split(",")
        .map((id) => Number(id)) || [];

    const foods = await Food.findAll({
      where: {
        id: ids.length ? ids : undefined,
      },
    });

    res.status(200).send({
      success: true,
      foods,
    });
  } catch (error) {
    console.error("Error retrieving foods:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving foods.",
    });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const num = await Food.destroy({ where: { id } });
    if (num === 1) {
      res.status(200).send({ message: "Food was deleted successfully!" });
    } else {
      res
        .status(404)
        .send({ message: `Cannot delete Food with id=${id}. Food not found!` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Couldn't delete Food with id=" + id,
    });
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    const num = await Food.destroy({ where: {}, truncate: false });
    res
      .status(200)
      .send({ message: `${num} Foods were deleted successfully.` });
  } catch (error) {
    res.status(500).send({
      message: "Couldn't delete all Foods.",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { imgUrl, name, description, price, assessment, menu } = req.body;

  if (
    !imgUrl ||
    !name ||
    !description ||
    price === undefined ||
    assessment === undefined ||
    menu === undefined
  ) {
    res.status(400).send({ message: "All fields are required." });
    return;
  }

  try {
    const [num] = await Food.update(
      { imgUrl, name, description, price, assessment, menu },
      { where: { id } }
    );
    if (num === 1) {
      res.status(200).send({ message: "Food was updated successfully!" });
    } else {
      res
        .status(404)
        .send({ message: `Cannot update Food with id=${id}. Food not found!` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Food with id=" + id,
    });
  }
};
