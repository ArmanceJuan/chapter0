import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "../controllers/projectController";
import {
  createCharacter,
  deleteCharacter,
  getAllCharactersByProject,
  getCharacterById,
  updateCharacter,
} from "../controllers/characterController";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaceByProjectId,
  updatePlace,
} from "../controllers/placeController";
import {
  deleteStoryArc,
  updateStoryArc,
  getStoryArcById,
  createStoryArc,
  getAllStoryArcsByProject,
} from "../controllers/storyArcController";
import {
  deleteChapter,
  updateChapter,
  getChapterById,
  createChapter,
  getAllChaptersByProject,
} from "../controllers/chapterController";

const router = Router();

// TODO : Add project users routes
// TODO : Add every all routes : all project users, all projects (d'un utilisateur)
// TODO: Add send email for reset password
router.post("/user/:userId/reset-password", authMiddleware, resetPassword);

// Chapters routes
router.delete(
  "/:projectId/chapter/:chapterId/delete",
  authMiddleware,
  deleteChapter
);
router.put(
  "/:projectId/chapter/:chapterId/edit",
  authMiddleware,
  updateChapter
);
router.get(
  "/:projectId/chapter/:chapterId/view",
  authMiddleware,
  getChapterById
);
router.post("/:projectId/chapter/create", authMiddleware, createChapter);
router.get("/:projectId/chapter/all", authMiddleware, getAllChaptersByProject);

// StoryArcs routes
router.delete(
  "/:projectId/storyArc/:storyArcId/delete",
  authMiddleware,
  deleteStoryArc
);
router.put(
  "/:projectId/storyArc/:storyArcId/edit",
  authMiddleware,
  updateStoryArc
);
router.get(
  "/:projectId/storyArc/:storyArcId/view",
  authMiddleware,
  getStoryArcById
);
router.post("/:projectId/storyArc/create", authMiddleware, createStoryArc);
router.get(
  "/:projectId/storyArc/all",
  authMiddleware,
  getAllStoryArcsByProject
);

// Places routes
router.delete("/:projectId/place/:placeId/delete", authMiddleware, deletePlace);
router.put("/:projectId/place/:placeId/edit", authMiddleware, updatePlace);
router.get("/:projectId/place/:placeId/view", authMiddleware, getPlaceById);
router.post("/:projectId/place/create", authMiddleware, createPlace);
router.get("/:projectId/place/all", authMiddleware, getPlaceByProjectId);

// Characters routes
router.delete(
  "/:projectId/character/:characterId/delete",
  authMiddleware,
  deleteCharacter
);
router.put(
  "/:projectId/character/:characterId/edit",
  authMiddleware,
  updateCharacter
);
router.get(
  "/:projectId/character/:characterId/view",
  authMiddleware,
  getCharacterById
);
router.post("/:projectId/character/create", authMiddleware, createCharacter);
router.get(
  "/:projectId/character/all",
  authMiddleware,
  getAllCharactersByProject
);

// Users routes
router.delete("/user/:userId/delete", authMiddleware, deleteUser);
router.get("/user/:userId/view", authMiddleware, getUserById);
router.put("/user/:userId/edit", authMiddleware, updateUser);
router.post("/user/register", createUser);
router.post("/user/logout", logoutUser);
router.post("/user/login", loginUser);
router.get("/user/me", authMiddleware, getMe);

// Projects routes
router.delete("/project/:projectId/delete", authMiddleware, deleteProject);
router.put("/project/:projectId/edit", authMiddleware, updateProject);
router.get("/project/:projectId/view", authMiddleware, getProjectById);
router.post("/project/create", authMiddleware, createProject);

export default router;
