import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { idCheck } from "../controller/user.controller";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  user?: CustomJwtPayload;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("Access denied: Token is missing");
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    (req as CustomRequest).user = user as CustomJwtPayload;
    next();
  });

  // const JwtPayload: any = jwt.verify(token, process.env.JWT_SECRET as string);

  // const { id } = JwtPayload;
  // const user = await idCheck(id);
  // req.user = user;
  // next();
};
