import { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Response,
  res: Response,
  next: NextFunction
) => {
  // const { token } = req.headers;
};

export default authMiddleware;
