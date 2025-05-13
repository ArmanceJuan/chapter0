import { db, projects } from "../db";
import { eq } from "drizzle-orm";

export const isProjectOwner = async (projectId: string, userId: string) => {
  const project = await db
    .select({ ownerId: projects.ownerId })
    .from(projects)
    .where(eq(projects.projectId, projectId));

  const result = await db
    .select({ projectId: projects.projectId, ownerId: projects.ownerId })
    .from(projects);

  if (project.length === 0) {
    return false;
  }

  const ownerId = String(project[0].ownerId).trim();
  const currentUserId = String(userId).trim();

  return ownerId === currentUserId;
};
