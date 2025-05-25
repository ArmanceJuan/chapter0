import { Response } from "express";
import { eq } from "drizzle-orm";
import { chapters, db } from "../db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { sanitizeChapter } from "../lib/security/sanitation/sanitizeChapter";
import { validateChapter } from "../lib/security/validation/validateChapter";

export const createChapter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { name, number, content, version, status } = req.body;

    const userId = req.user?.id;
    if (!userId || !projectId) {
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    validateChapter({ name, number, content, version, status });
    const sanitizedData = sanitizeChapter({
      name,
      number,
      content,
      version,
      status,
    });

    const chapter = await db
      .insert(chapters)
      .values({
        projectId,
        name: sanitizedData.name,
        number: Number(sanitizedData.number),
        content: sanitizedData.content,
        version: Number(sanitizedData.version),
        status: Boolean(sanitizedData.status),
      })
      .returning();

    res.status(201).json({ message: "Chapter created successfully", chapter });
  } catch (error) {
    console.error("Erreur d'insertion chapitre :", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getChapterById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { chapterId, projectId } = req.params;

    if (!chapterId || !projectId) {
      res.status(400).json({ error: "Missing chapterId or projectId" });
      return;
    }

    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
    }

    res.status(200).json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllChaptersByProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(400).json({ error: "Missing project id" });
      return;
    }

    const allChapters = await db
      .select()
      .from(chapters)
      .where(eq(chapters.projectId, projectId));
    res.status(200).json(allChapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateChapter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { chapterId, projectId } = req.params;
    const { name, number, content, version, status } = req.body;

    const userId = req.user?.id;
    if (!userId || !chapterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or chapter id" });
      return;
    }

    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    type ChapterUpdate = {
      name?: string;
      number?: number;
      content?: string;
      version?: number;
      status?: boolean;
      updatedAt?: Date;
    };

    const updates: ChapterUpdate = {};
    if (name) updates.name = name;
    if (number) updates.number = number;
    if (content) updates.content = content;
    if (version) updates.version = version;
    if (status) updates.status = status;
    updates.updatedAt = new Date();

    validateChapter({ name, number, content, version, status });
    const sanitizedData = sanitizeChapter({
      name,
      number,
      content,
      version,
      status,
    });
    await db
      .update(chapters)
      .set({
        name: sanitizedData.name,
        number: Number(sanitizedData.number),
        content: sanitizedData.content,
        version: Number(sanitizedData.version),
        status: Boolean(sanitizedData.status),
      })
      .where(eq(chapters.id, chapterId));
    res.status(200).json({ message: "Chapter updated successfully", updates });
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteChapter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { chapterId, projectId } = req.params;

    const userId = req.user?.id;

    if (!userId || !chapterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or chapter id" });
      return;
    }

    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    await db.delete(chapters).where(eq(chapters.id, chapterId));

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
