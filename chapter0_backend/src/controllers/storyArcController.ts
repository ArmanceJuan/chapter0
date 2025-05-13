import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { isProjectOwner } from "../utils/isOwner";
import { db, storyArcs } from "../db";

export const createStoryArc = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { storyArcTitle, storyArcDescription, linkedArcs, storyArcStatus } =
      req.body;

    const userId = req.user?.userId;
    if (!userId || !projectId) {
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to create a story arc" });
      return;
    }

    if (!storyArcTitle) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const storyArc = await db
      .insert(storyArcs)
      .values({
        projectId,
        storyArcTitle,
        storyArcDescription,
        linkedArcs,
        storyArcStatus,
      })
      .returning();

    res
      .status(201)
      .json({ message: "StoryArc created successfully", storyArc });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getStoryArcById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { storyArcId, projectId } = req.params;

    if (!storyArcId || !projectId) {
      res.status(400).json({ error: "Missing storyArcId or projectId" });
      return;
    }

    const storyArc = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.storyArcId, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
    }

    res.status(200).json(storyArc[0]);
  } catch (error) {
    console.error("Error fetching story arc:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStoryArcsByProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(400).json({ error: "Missing project id" });
      return;
    }

    const allStoryArcs = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.projectId, projectId));
    res.status(200).json(allStoryArcs);
  } catch (error) {
    console.error("Error fetching story arc:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStoryArc = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { storyArcId, projectId } = req.params;
    const { storyArcTitle, storyArcDescription, linkedArcs, storyArcStatus } =
      req.body;

    const userId = req.user?.userId;
    if (!userId || !storyArcId || !projectId) {
      res.status(400).json({ error: "Missing user, project or story arc id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to create a story arc" });
      return;
    }

    const storyArc = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.storyArcId, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
      return;
    }

    type StoryArcUpdate = {
      storyArcTitle?: string;
      storyArcDescription?: string;
      storyArcStatus?: boolean;
      updatedAt?: Date;
    };

    const updates: StoryArcUpdate = {};
    if (storyArcTitle) updates.storyArcTitle = storyArcTitle;
    if (storyArcDescription) updates.storyArcDescription = storyArcDescription;
    if (storyArcStatus) updates.storyArcStatus = storyArcStatus;
    updates.updatedAt = new Date();

    await db
      .update(storyArcs)
      .set(updates)
      .where(eq(storyArcs.storyArcId, storyArcId));
    res.status(200).json({ message: "StoryArc updated successfully", updates });
  } catch (error) {
    console.error("Error updating story arc:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteStoryArc = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { storyArcId, projectId } = req.params;

    const userId = req.user?.userId;

    if (!userId || !storyArcId || !projectId) {
      res.status(400).json({ error: "Missing user, project or story arc id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to delete a sory arc" });
      return;
    }

    const storyArc = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.storyArcId, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
      return;
    }

    await db.delete(storyArcs).where(eq(storyArcs.storyArcId, storyArcId));

    res.status(200).json({ message: "StoryArc deleted successfully" });
  } catch (error) {
    console.error("Error deleting story arc:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
