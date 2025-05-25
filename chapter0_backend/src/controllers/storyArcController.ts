import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { db, storyArcs } from "../db";
import { validateStoryArc } from "../lib/security/validation/validateStoryarc";
import { sanitizeStoryArc } from "../lib/security/sanitation/sanitizerStoryarc";

export const createStoryArc = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { name, description, linkedArcs, imageUrl, status } = req.body;

    console.log("body reçu :", req.body);

    const userId = req.user?.id;
    if (!userId || !projectId) {
      console.log("userId ou projectId null");
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    if (!name) {
      console.log("name null");
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    validateStoryArc({
      name,
      description,
      linkedArcs,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizeStoryArc({
      name,
      description,
      linkedArcs,
      imageUrl,
      status,
    });
    const storyArc = await db
      .insert(storyArcs)
      .values({
        projectId,
        name: sanitizedData.name,
        description: sanitizedData.description,
        linkedArcs: sanitizedData.linkedArcs,
        imageUrl: sanitizedData.imageUrl,
        status: sanitizedData.status,
      })
      .returning();

    console.log("body reçu :", req.body);

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
      .where(eq(storyArcs.id, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
    }

    res.status(200).json(storyArc);
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
    const { name, description, status, linkedArcs, imageUrl } = req.body;

    const userId = req.user?.id;
    if (!userId || !storyArcId || !projectId) {
      res.status(400).json({ error: "Missing user, project or story arc id" });
      return;
    }

    const storyArc = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.id, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
      return;
    }

    type StoryArcUpdate = {
      name?: string;
      description?: string;
      status?: boolean;
      linkedArcs?: string;
      imageUrl?: string;
      updatedAt?: Date;
    };

    const updates: StoryArcUpdate = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (status) updates.status = status;
    updates.updatedAt = new Date();
    if (linkedArcs) updates.linkedArcs = linkedArcs;
    if (imageUrl) updates.imageUrl = imageUrl;

    validateStoryArc({
      name,
      description,
      linkedArcs,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizeStoryArc({
      name,
      description,
      linkedArcs,
      imageUrl,
      status,
    });

    await db.update(storyArcs).set(updates).where(eq(storyArcs.id, storyArcId));
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

    const userId = req.user?.id;

    if (!userId || !storyArcId || !projectId) {
      res.status(400).json({ error: "Missing user, project or story arc id" });
      return;
    }

    const storyArc = await db
      .select()
      .from(storyArcs)
      .where(eq(storyArcs.id, storyArcId));

    if (storyArc.length === 0) {
      res.status(404).json({ error: "StoryArc not found" });
      return;
    }

    await db.delete(storyArcs).where(eq(storyArcs.id, storyArcId));

    res.status(200).json({ message: "StoryArc deleted successfully" });
  } catch (error) {
    console.error("Error deleting story arc:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
