import { Request, Response } from "express";
import db from "../model/index.js";
import { Food } from "../model/food.js";

const { Category } = db;

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Амжилтгүй..." });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const category = await Category.findOne({
      where: { id },
      include: [{ model: Food, as: "foods" }],
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json({ error: "Категори олдсонгүй." });
    }
  } catch (error) {
    res.status(500).json({ error: "Категори авч чадсангүй" });
  }
};
