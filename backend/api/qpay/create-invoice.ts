import { createQpayInvoice } from "../../utils/qpay/invoice";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { amount, user_id, code, invoice_id } = req.body;

    try {
      const response = await createQpayInvoice({
        amount,
        user_id,
        code,
        invoice_id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
