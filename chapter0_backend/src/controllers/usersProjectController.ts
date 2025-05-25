import { Response } from "express";
import { eq, and } from "drizzle-orm";
import { db, notifications, projects, projectUsers, users } from "../db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const getProjectsByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ error: "Missing user id" });
      return;
    }
    const result = await db
      .select({
        project: projects,
      })
      .from(projectUsers)
      .innerJoin(projects, eq(projectUsers.projectId, projects.id))
      .where(eq(projectUsers.userId, userId));

    const projectsList = result.map((project) => project.project);
    res.status(200).json(projectsList);
  } catch (error) {
    console.error("Error fetching projects for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersByProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { projectId } = req.params;
  try {
    const result = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: projectUsers.role,
      })
      .from(projectUsers)
      .innerJoin(users, eq(projectUsers.userId, users.id))
      .where(eq(projectUsers.projectId, projectId));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching projects for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addUserToProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { projectId } = req.params;
  const { user, role, userId } = req.body;
  console.log("user:", user);
  try {
    await db.insert(projectUsers).values({ projectId, userId, role });
    if (role === "pending") {
      const project = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));
      if (project.length > 0) {
        const ownerId = project[0].ownerId;
      }

      if (project.length > 0) {
        const ownerId = project[0].ownerId;

        await db.insert(notifications).values({
          type: "join_request",
          userId: ownerId,
          projectId,
          content: `${req.user?.username} demande a de rejoindre votre projet`,
          createdAt: new Date(),
          updatedAt: new Date(),
          read: false,
        });
      }
    }
    res.status(200).json({ message: "User added to project" });
  } catch (error) {
    console.error("Error adding user to project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserRole = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { userId, projectId } = req.params;
  const { role } = req.body;

  if (!["reader", "collaborator"].includes(role)) {
    res.status(400).json({ error: "Invalid role" });
  }
  try {
    await db
      .update(projectUsers)
      .set({ role })
      .where(
        and(
          eq(projectUsers.projectId, projectId),
          eq(projectUsers.userId, userId)
        )
      );
    res.status(200).json({ message: "User role updated" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeUserFromProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { projectId, userId } = req.params;

  try {
    await db
      .delete(projectUsers)
      .where(
        and(
          eq(projectUsers.projectId, projectId),
          eq(projectUsers.userId, userId)
        )
      );
    res.status(200).json({ message: "User removed from project" });
  } catch (error) {
    console.error("Error removing user from project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
