import { Request, Response } from "express";
import db from "../model/index.js";

const { Order, Cart } = db;

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

// export const getOrderByCartAuth0Id = async (req: Request, res: Response) => {
//   try {
//     const { auth0Id } = req.params; // Extract auth0Id from the request parameters

//     // Validate the presence of auth0Id
//     if (!auth0Id) {
//       return res.status(400).send({ message: "auth0Id is required" });
//     }

//     // Find the order where auth0Id matches
//     const order = await Order.findOne({
//       where: { auth0Id }, // Filter orders by auth0Id
//       include: [
//         {
//           model: Cart, // Include the Cart model
//           as: "cart", // Ensure the association name is correct
//         },
//       ],
//     });

//     // Check if the order was found
//     if (!order) {
//       return res.status(404).send({ message: "Order not found" });
//     }

//     // Respond with the found order
//     return res.status(200).send(order);
//   } catch (error) {
//     // Handle any errors that occur during the database operation
//     console.error("Error retrieving order:", error);
//     return res.status(500).send({
//       message: (error as Error).message || "Error retrieving order",
//     });
//   }
// };
