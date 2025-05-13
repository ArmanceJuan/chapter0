import { Response } from "express";
import { eq } from "drizzle-orm";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { isProjectOwner } from "../utils/isOwner";
import { db, places } from "../db";

export const createPlace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const {
      placeName,
      placeDescription,
      placeHistory,
      placeLocation,
      placeImageUrl,
      placeStatus,
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

    if (!placeName) {
      res.status(400).json({ error: "Missing place name" });
      return;
    }

    const place = await db
      .insert(places)
      .values({
        projectId,
        placeName,
        placeDescription,
        placeHistory,
        placeLocation,
        placeImageUrl,
        placeStatus,
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
      res.status(400).json({ error: "Missing placeId or projectId" });
      return;
    }

    const place = await db
      .select()
      .from(places)
      .where(eq(places.placeId, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json(place[0]);
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
    const {
      placeName,
      placeDescription,
      placeHistory,
      placeLocation,
      placeImageUrl,
      placeStatus,
    } = req.body;

    const userId = req.user?.userId;
    if (!userId || !placeId || !projectId) {
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

    const place = await db
      .select()
      .from(places)
      .where(eq(places.placeId, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
      return;
    }

    type PlaceUpdate = {
      placeName?: string;
      placeDescription?: string;
      placeHistory?: string;
      placeLocation?: string;
      placeImageUrl?: string;
      placeStatus?: boolean;
      updatedAt?: Date;
    };

    const updates: PlaceUpdate = {};
    if (placeName) updates.placeName = placeName;
    if (placeDescription) updates.placeDescription = placeDescription;
    if (placeHistory) updates.placeHistory = placeHistory;
    if (placeLocation) updates.placeLocation = placeLocation;
    if (placeImageUrl) updates.placeImageUrl = placeImageUrl;
    if (placeStatus) updates.placeStatus = placeStatus;
    updates.updatedAt = new Date();

    await db.update(places).set(updates).where(eq(places.placeId, placeId));

    res.status(200).json({ message: "Place updated successfully" });
  } catch (error) {
    console.error("Error updating place:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePlace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { placeId, projectId } = req.params;

    const userId = req.user?.userId;

    if (!userId || !placeId || !projectId) {
      res.status(400).json({ error: "Missing user, project or place id" });
      return;
    }

    const isOwner = await isProjectOwner(projectId, userId);
    if (!isOwner) {
      res
        .status(403)
        .json({ error: "User is not authorized to delete a place" });
      return;
    }

    const place = await db
      .select()
      .from(places)
      .where(eq(places.placeId, placeId));

    if (place.length === 0) {
      res.status(404).json({ error: "Place not found" });
      return;
    }

    await db.delete(places).where(eq(places.placeId, placeId));

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
