import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { db, characters } from "../db";
import { isProjectOwner } from "../utils/isOwner";

export const createCharacter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const {
      characterName,
      characterDescription,
      characterHistory,
      characterpsychologicalProfile,
      characterRelationships,
      characterImageUrl,
      characterStatus,
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
        .json({ error: "User is not authorized to create a character" });
      return;
    }

    if (!characterName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const character = await db
      .insert(characters)
      .values({
        projectId,
        characterName,
        characterDescription,
        characterHistory,
        characterpsychologicalProfile,
        characterRelationships,
        characterImageUrl,
        characterStatus,
      })
      .returning();

    res
      .status(201)
      .json({ message: "Character created successfully", character });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCharacterById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { characterId, projectId } = req.params;

    if (!characterId || !projectId) {
      res.status(400).json({ error: "Missing characterId or projectId" });
      return;
    }

    const character = await db
      .select()
      .from(characters)
      .where(eq(characters.characterId, characterId));

    if (character.length === 0) {
      res.status(404).json({ error: "Character not found" });
      return;
    }
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCharactersByProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(400).json({ error: "Missing project id" });
      return;
    }
    const allCharacters = await db
      .select()
      .from(characters)
      .where(eq(characters.projectId, projectId));
    res.status(200).json(allCharacters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCharacter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { characterId, projectId } = req.params;
    const {
      characterName,
      characterDescription,
      characterHistory,
      characterpsychologicalProfile,
      characterRelationships,
      characterImageUrl,
      characterStatus,
    } = req.body;

    const userId = req.user?.userId;

    if (!userId || !characterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or character id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to create a character" });
      return;
    }

    const character = await db
      .select()
      .from(characters)
      .where(eq(characters.characterId, characterId));

    if (character.length === 0) {
      res.status(404).json({ error: "Character not found" });
      return;
    }

    type CharacterUpdate = {
      characterName?: string;
      characterDescription?: string;
      characterHistory?: string;
      characterpsychologicalProfile?: string;
      characterRelationships?: string;
      characterImageUrl?: string;
      characterStatus?: boolean;
      updatedAt?: Date;
    };

    const updates: CharacterUpdate = {};
    if (characterName) updates.characterName = characterName;
    if (characterDescription)
      updates.characterDescription = characterDescription;
    if (characterHistory) updates.characterHistory = characterHistory;
    if (characterpsychologicalProfile)
      updates.characterpsychologicalProfile = characterpsychologicalProfile;
    if (characterRelationships)
      updates.characterRelationships = characterRelationships;
    if (characterImageUrl) updates.characterImageUrl = characterImageUrl;
    if (characterStatus) updates.characterStatus = characterStatus;
    updates.updatedAt = new Date();

    await db
      .update(characters)
      .set(updates)
      .where(eq(characters.characterId, characterId));
    res
      .status(200)
      .json({ message: "Character updated successfully", updates });
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCharacter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { characterId, projectId } = req.params;

    const userId = req.user?.userId;

    if (!userId || !characterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or character id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to delete a character" });
      return;
    }

    const character = await db
      .select()
      .from(characters)
      .where(eq(characters.characterId, characterId));

    if (character.length === 0) {
      res.status(404).json({ error: "Character not found" });
      return;
    }

    await db.delete(characters).where(eq(characters.characterId, characterId));

    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
