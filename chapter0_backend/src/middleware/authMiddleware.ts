import { Response, Request, NextFunction } from "express";
import { db, users } from "../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    isAdmin: boolean;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "Missing or invalid token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        isAdmin: users.isAdmin,
      })
      .from(users)
      .where(eq(users.id, decoded.id));

    if (user.length === 0) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.user = user[0];
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
