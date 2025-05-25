import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import { db, projects, projectUsers } from "../db";
import { and, eq } from "drizzle-orm";

export const isOwnerMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { projectId } = req.params;

  if (!user || !projectId) {
    console.log("Middleware check failed: missing user or projectId", {
      user,
      projectId,
    });

    res.status(401).json({ error: "Missing user or project id" });
    return;
  }

  if (user.isAdmin) {
    console.log("User is admin, allowing request.");

    return next();
  }

  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    const ownerId = project[0].ownerId;

    if (ownerId !== user.id) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
