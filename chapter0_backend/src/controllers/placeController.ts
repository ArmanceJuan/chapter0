import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { db, places } from "../db";
import { sanitizePlace } from "../lib/security/sanitation/sanitizerPlace";
import { validatePlace } from "../lib/security/validation/validatePlace";

export const createPlace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { name, description, history, location, imageUrl, status } = req.body;

    const userId = req.user?.id;
    if (!userId || !projectId) {
      res.status(400).json({ error: "Missing user or project id" });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Missing place name" });
      return;
    }

    validatePlace({
      name,
      description,
      history,
      location,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizePlace({
      name,
      description,
      history,
      location,
      imageUrl,
      status,
    });

    const place = await db
      .insert(places)
      .values({
        projectId,
        name: sanitizedData.name,
        description: sanitizedData.description,
        history: sanitizedData.history,
        location: sanitizedData.location,
        imageUrl: sanitizedData.imageUrl,
        status: sanitizedData.status,
      })
      .returning();

    res.status(201).json({ message: "Place created successfully", place });
  } catch (error) {
    res.status(500).json({ message: "Error creating place" });
  }
};

export const getPlaceById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { placeId, projectId } = req.params;

    if (!placeId || !projectId) {
      res.status(400).json({ error: "Missing place id or project id" });
      return;
    }

    const place = await db.select().from(places).where(eq(places.id, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPlaceByProjectId = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      res.status(400).json({ error: "Missing project id" });
      return;
    }

    const allPlace = await db
      .select()
      .from(places)
      .where(eq(places.projectId, projectId));
    res.status(200).json(allPlace);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePlace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { placeId, projectId } = req.params;
    const { name, description, history, location, imageUrl, status } = req.body;

    const userId = req.user?.id;
    if (!userId || !placeId || !projectId) {
      res.status(400).json({ error: "Missing user, project or character id" });
      return;
    }

    const place = await db.select().from(places).where(eq(places.id, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
      return;
    }

    type PlaceUpdate = {
      name?: string;
      description?: string;
      history?: string;
      location?: string;
      imageUrl?: string;
      status?: boolean;
      updatedAt?: Date;
    };

    const updates: PlaceUpdate = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (history) updates.history = history;
    if (location) updates.location = location;
    if (imageUrl) updates.imageUrl = imageUrl;
    if (status) updates.status = status;
    updates.updatedAt = new Date();

    validatePlace({
      name,
      description,
      history,
      location,
      imageUrl,
      status,
    });
    const sanitizedData = sanitizePlace({
      name,
      description,
      history,
      location,
      imageUrl,
      status,
    });
    await db
      .update(places)
      .set({
        name: sanitizedData.name,
        description: sanitizedData.description,
        history: sanitizedData.history,
        location: sanitizedData.location,
        imageUrl: sanitizedData.imageUrl,
        status: sanitizedData.status,
        updatedAt: new Date(),
      })
      .where(eq(places.id, placeId));

    res.status(200).json({ message: "Place updated successfully" });
  } catch (error) {
    console.error("Error updating place:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePlace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { placeId, projectId } = req.params;

    const userId = req.user?.id;

    if (!userId || !placeId || !projectId) {
      res.status(400).json({ error: "Missing user, project or place id" });
      return;
    }

    const place = await db.select().from(places).where(eq(places.id, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
      return;
    }

    await db.delete(places).where(eq(places.id, placeId));

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
