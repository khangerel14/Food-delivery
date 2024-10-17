import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

interface CustomJwtPayload extends JwtPayload {
  id: number; // Ensure this matches the type you expect
}
