import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { db, characters } from "../db";
import { validateCharacter } from "../lib/security/validation/validateCharacter";
import { sanitizeCharacter } from "../lib/security/sanitation/sanitizeCharacter";

export const createCharacter = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const {
      name,
      description,
      age,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    } = req.body;

    const userId = req.user?.id;
    if (!userId || !projectId) {
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    validateCharacter({
      name,
      age,
      description,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizeCharacter({
      name,
      age,
      description,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    });

    const character = await db
      .insert(characters)
      .values({
        projectId,
        name: sanitizedData.name,
        age: sanitizedData.age,
        description: sanitizedData.description,
        history: sanitizedData.history,
        psychologicalProfile: sanitizedData.psychologicalProfile,
        relationships: sanitizedData.relationships,
        imageUrl: sanitizedData.imageUrl,
        status: sanitizedData.status,
      })
      .returning();

    res
      .status(201)
      .json({ message: "Character created successfully", character });
  } catch (error) {
    console.error("Erreur dans createCharacter :", error);
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
      .where(eq(characters.id, characterId));

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
      name,
      description,
      age,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    } = req.body;

    const userId = req.user?.id;
    if (!userId || !characterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or character id" });
      return;
    }

    const character = await db
      .select()
      .from(characters)
      .where(eq(characters.id, characterId));

    if (character.length === 0) {
      res.status(404).json({ error: "Character not found" });
      return;
    }

    type CharacterUpdate = {
      name?: string;
      description?: string;
      age?: number;
      history?: string;
      psychologicalProfile?: string;
      relationships?: string;
      imageUrl?: string;
      status?: boolean;
      updatedAt?: Date;
    };

    const updates: CharacterUpdate = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (history) updates.history = history;
    if (psychologicalProfile)
      updates.psychologicalProfile = psychologicalProfile;
    if (relationships) updates.relationships = relationships;
    if (imageUrl) updates.imageUrl = imageUrl;
    if (status) updates.status = status;
    if (age) updates.age = age;
    updates.updatedAt = new Date();

    validateCharacter({
      name,
      age,
      description,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizeCharacter({
      name,
      age,
      description,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
    });

    await db
      .update(characters)
      .set({
        name: sanitizedData.name,
        age: sanitizedData.age,
        description: sanitizedData.description,
        history: sanitizedData.history,
        psychologicalProfile: sanitizedData.psychologicalProfile,
        relationships: sanitizedData.relationships,
        imageUrl: sanitizedData.imageUrl,
        status: sanitizedData.status,
        updatedAt: new Date(),
      })
      .where(eq(characters.id, characterId));
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

    const userId = req.user?.id;

    if (!userId || !characterId || !projectId) {
      res.status(400).json({ error: "Missing user, project or character id" });
      return;
    }

    const character = await db
      .select()
      .from(characters)
      .where(eq(characters.id, characterId));

    if (character.length === 0) {
      res.status(404).json({ error: "Character not found" });
      return;
    }

    await db.delete(characters).where(eq(characters.id, characterId));

    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
