import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const isAdminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden : Your are not an admin" });
    return;
  }
  next();
};
