import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { eq } from "drizzle-orm";
import { db, projects, projectUsers } from "../db";
import { sanitizeProject } from "../lib/security/sanitation/sanitizeProject";
import { validateProject } from "../lib/security/validation/validateProject";

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, description } = req.body;
    const ownerId = req.user?.id;

    if (!ownerId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    validateProject({ name, description });
    const sanitizedData = sanitizeProject({ name, description });

    const project = await db
      .insert(projects)
      .values({
        name: sanitizedData.name,
        description: sanitizedData.description,
        ownerId,
        ownerName: req.user?.username,
      })
      .returning();

    await db
      .insert(projectUsers)
      .values({ projectId: project[0].id, userId: ownerId, role: "owner" });

    console.log("req.user", req.user);

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    console.error("Error creating project:", error.message);
  }
};

export const getAllProjects = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden : Your are not an admin" });
    return;
  }
  try {
    const allProjects = await db.select().from(projects).orderBy(projects.name);
    res.status(200).json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      .where(eq(projects.id, projectId));
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
    const { name, description } = req.body;

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (project[0].ownerId !== req.user?.id) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }

    type ProjectUpdate = {
      name?: string;
      description?: string;
      updatedAt?: Date;
    };

    const updates: ProjectUpdate = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    updates.updatedAt = new Date();

    validateProject({ name, description });
    const sanitizedData = sanitizeProject({ name, description });
    await db
      .update(projects)
      .set({
        name: sanitizedData.name,
        description: sanitizedData.description,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId));

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
      .where(eq(projects.id, projectId));

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (project[0].ownerId !== req.user?.id) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }

    await db.delete(projects).where(eq(projects.id, projectId));

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
