import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}
