import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Optional user property of type JwtPayload or string
    }
  }
}
