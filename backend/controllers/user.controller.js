import { Op } from "sequelize";
import db from "../models/index.js";

const { User } = db;

export const create = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required." });
    }

    const user = { email, name };

    const data = await User.create(user);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const user = req.body.user;
    const condition = user ? { email: { [Op.like]: `%${user}%` } } : null;

    const data = await User.findAll({ where: condition });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByPk(id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await User.destroy({
      where: { id: id },
    });
    if (num === 1) {
      res.status(200).send({
        message: "User was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${id}. User not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Couldn't delete User with id=" + id,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const num = await User.destroy({
      where: {},
      truncate: false,
    });
    res.status(200).send({
      message: `${num} Users were deleted successfully.`,
    });
  } catch (err) {
    res.status(500).send({
      message: "Couldn't delete all Users.",
    });
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  try {
    const [num] = await User.update({ email, name }, { where: { id: id } });

    if (num === 1) {
      res.status(200).send({ message: "User was updated successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot update User with id=${id}. User not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};
