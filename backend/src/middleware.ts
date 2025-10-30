import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mukul@!2004";

export interface AuthRequest extends Request {
  userId?: string;
}

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers["token"] as string | undefined;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};