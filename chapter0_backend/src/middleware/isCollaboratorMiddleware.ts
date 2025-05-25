import { db, projectUsers } from "../db";
import { eq, and } from "drizzle-orm";

export const isCollaboratorMiddleware = async (
  req: any,
  res: any,
  next: any
) => {
  const userId = req.user?.id;
  const { projectId } = req.params;

  try {
    const collaboratorships = await db
      .select()
      .from(projectUsers)
      .where(
        and(
          eq(projectUsers.projectId, projectId),
          eq(projectUsers.userId, userId)
        )
      );
    const userProject = collaboratorships[0];
    if (!userProject || userProject.role === "pending") {
      res
        .status(403)
        .json({ error: "Access denied : you are not a collaborator" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
