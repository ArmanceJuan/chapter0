import { Response, Request, NextFunction } from "express";
import { db, users } from "../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    username: string;
  };
}
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
    return;
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await db
      .select({
        userId: users.userId,
        email: users.email,
        username: users.username,
      })
      .from(users)
      .where(eq(users.userId, decoded.userId));

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
