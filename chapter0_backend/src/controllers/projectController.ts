import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { eq } from "drizzle-orm";
import { db, projects } from "../db";

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user?.userId;

    if (!ownerId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!title) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const project = await db
      .insert(projects)
      .values({ title, description, ownerId })
      .returning();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    console.error("Error creating project:", error.message);
  }
};

export const getProjectById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.projectId, projectId));
    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.projectId, projectId));

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (project[0].ownerId !== req.user?.userId) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }

    type ProjectUpdate = {
      title?: string;
      description?: string;
      updatedAt?: Date;
    };

    const updates: ProjectUpdate = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    updates.updatedAt = new Date();

    await db
      .update(projects)
      .set(updates)
      .where(eq(projects.projectId, projectId));

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.projectId, projectId));

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (project[0].ownerId !== req.user?.userId) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }

    await db.delete(projects).where(eq(projects.projectId, projectId));

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
