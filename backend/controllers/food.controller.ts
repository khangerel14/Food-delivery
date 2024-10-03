import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../models/index.js";

const { Food } = db;

export const create = async (req: Request, res: Response) => {
  try {
    const foods = req.body;

    if (
      !foods.imgUrl ||
      !foods.name ||
      !foods.description ||
      foods.price === undefined ||
      foods.assessment === undefined ||
      foods.categoryId === undefined
    ) {
      res.status(400).send({ message: "All fields are required." });
      return;
    }

    const data = await Food.create(foods);
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
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const limit: number = parseInt(req.query.limit as string, 10) || 8;
    const offset: number = (page - 1) * limit;

    const food: string = (req.query.food as string) || "";
    const categoryId: string = req.query.categoryId as string;

    let parsedCategoryId: number | undefined;
    if (categoryId) {
      const id = parseInt(categoryId, 10);
      if (!isNaN(id)) {
        parsedCategoryId = id;
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid categoryId parameter. It must be a number.",
        });
      }
    }

    const condition: any = {
      ...(food ? { name: { [Op.iLike]: `%${food}%` } } : {}),
      ...(parsedCategoryId !== undefined
        ? { categoryId: parsedCategoryId }
        : {}),
    };

    const { count, rows } = await Food.findAndCountAll({
      where: condition,
      offset: offset,
      limit: limit,
    });

    if (rows.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No foods found for the given criteria.",
        page,
        perPage: limit,
        totalCount: count,
        foods: [],
      });
    }

    res.status(200).send({
      success: true,
      page,
      perPage: limit,
      totalCount: count,
      foods: rows,
    });
  } catch (error) {
    console.error("Error retrieving foods:", error);
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
