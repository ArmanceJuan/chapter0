import { Response } from "express";
import { eq } from "drizzle-orm";
import { chapters, db } from "../db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { isProjectOwner } from "../utils/isOwner";

export const createChapter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const {
      chapterTitle,
      chapterNumber,
      chapterContent,
      chapterVersion,
      chapterStatus,
    } = req.body;

    const userId = req.user?.userId;
    if (!userId || !projectId) {
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to create a chapter" });
      return;
    }

    if (!chapterTitle) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const chapter = await db
      .insert(chapters)
      .values({
        projectId,
        chapterTitle,
        chapterNumber,
        chapterContent,
        chapterVersion,
        chapterStatus,
      })
      .returning();

    res.status(201).json({ message: "Chapter created successfully", chapter });
  } catch (error) {
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
      .where(eq(chapters.chapterId, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
    }

    res.status(200).json(chapter[0]);
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
    const {
      chapterTitle,
      chapterNumber,
      chapterContent,
      chapterVersion,
      chapterStatus,
    } = req.body;

    const userId = req.user?.userId;
    if (!userId || !chapterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or chapter id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to create a chapter" });
      return;
    }

    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.chapterId, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    type ChapterUpdate = {
      chapterTitle?: string;
      chapterNumber?: number;
      chapterContent?: string;
      chapterVersion?: number;
      chapterStatus?: boolean;
      updatedAt?: Date;
    };

    const updates: ChapterUpdate = {};
    if (chapterTitle) updates.chapterTitle = chapterTitle;
    if (chapterNumber) updates.chapterNumber = chapterNumber;
    if (chapterContent) updates.chapterContent = chapterContent;
    if (chapterVersion) updates.chapterVersion = chapterVersion;
    if (chapterStatus) updates.chapterStatus = chapterStatus;
    updates.updatedAt = new Date();

    await db
      .update(chapters)
      .set(updates)
      .where(eq(chapters.chapterId, chapterId));
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

    const userId = req.user?.userId;

    if (!userId || !chapterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or chapter id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to delete a chapter" });
      return;
    }

    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.chapterId, chapterId));

    if (chapter.length === 0) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    await db.delete(chapters).where(eq(chapters.chapterId, chapterId));

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
