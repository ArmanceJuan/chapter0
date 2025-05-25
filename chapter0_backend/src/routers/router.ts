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
  getAllUsers,
  promoteToAdmin,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createProject,
  deleteProject,
  getAllProjects,
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
import { isOwnerMiddleware } from "../middleware/isOwnerMiddleware";
import {
  addUserToProject,
  getProjectsByUser,
  getUsersByProject,
  removeUserFromProject,
  updateUserRole,
} from "../controllers/usersProjectController";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import { isCollaboratorMiddleware } from "../middleware/isCollaboratorMiddleware";

const router = Router();

router.patch(
  "/project/:projectId/user/:userId/edit-role",
  authMiddleware,
  isOwnerMiddleware,
  updateUserRole
);
router.get("/admin/users", authMiddleware, isAdminMiddleware, getAllUsers);
router.get("/admin/projects", authMiddleware, getAllProjects);
router.patch(
  "/user/:userId/promote",
  authMiddleware,
  isAdminMiddleware,
  promoteToAdmin
);
router.post("/user/:userId/reset-password", authMiddleware, resetPassword);
router.delete(
  "/project/:projectId/chapter/:chapterId/delete",
  authMiddleware,
  isOwnerMiddleware,
  deleteChapter
);
router.patch(
  "/project/:projectId/chapter/:chapterId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updateChapter
);
router.get(
  "/project/:projectId/chapter/:chapterId/view",
  authMiddleware,
  isCollaboratorMiddleware,
  getChapterById
);
router.post(
  "/project/:projectId/chapter/create",
  authMiddleware,
  isOwnerMiddleware,
  createChapter
);
router.get(
  "/project/:projectId/chapter/all",
  authMiddleware,
  isCollaboratorMiddleware,
  getAllChaptersByProject
);

// StoryArcs routes
router.delete(
  "/project/:projectId/storyarc/:storyArcId/delete",
  authMiddleware,
  isOwnerMiddleware,
  deleteStoryArc
);
router.patch(
  "/project/:projectId/storyarc/:storyArcId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updateStoryArc
);
router.get(
  "/project/:projectId/storyarc/:storyArcId/view",
  authMiddleware,
  isCollaboratorMiddleware,
  getStoryArcById
);
router.post(
  "/project/:projectId/storyarc/create",
  authMiddleware,
  isOwnerMiddleware,
  createStoryArc
);
router.get(
  "/project/:projectId/storyarc/all",
  authMiddleware,
  isCollaboratorMiddleware,
  getAllStoryArcsByProject
);

// Places routes
router.delete(
  "/project/:projectId/place/:placeId/delete",
  authMiddleware,
  isOwnerMiddleware,
  deletePlace
);
router.patch(
  "/project/:projectId/place/:placeId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updatePlace
);
router.get(
  "/project/:projectId/place/:placeId/view",
  authMiddleware,
  isCollaboratorMiddleware,
  getPlaceById
);
router.post(
  "/project/:projectId/place/create",
  authMiddleware,
  isOwnerMiddleware,
  createPlace
);
router.get(
  "/project/:projectId/place/all",
  authMiddleware,
  isCollaboratorMiddleware,
  getPlaceByProjectId
);

// Characters routes
router.delete(
  "/project/:projectId/character/:characterId/delete",
  authMiddleware,
  isOwnerMiddleware,
  deleteCharacter
);
router.patch(
  "/project/:projectId/character/:characterId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updateCharacter
);
router.get(
  "/project/:projectId/character/:characterId/view",
  authMiddleware,
  isCollaboratorMiddleware,
  getCharacterById
);
router.post(
  "/project/:projectId/character/create",
  authMiddleware,
  isOwnerMiddleware,
  createCharacter
);
router.get(
  "/project/:projectId/character/all",
  authMiddleware,
  isCollaboratorMiddleware,
  getAllCharactersByProject
);
// Projects Users routes
router.delete(
  "/project/:projectId/user/:userId/delete",
  authMiddleware,
  isOwnerMiddleware,
  removeUserFromProject
);
router.patch(
  "/project/:projectId/user/:userId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updateUserRole
);
router.post("/project/:projectId/user/add", authMiddleware, addUserToProject);
router.get(
  "/project/:projectId/users",
  authMiddleware,
  isCollaboratorMiddleware,
  getUsersByProject
);
router.get("/user/:userId/projects", authMiddleware, getProjectsByUser);
// Users routes
router.delete("/user/:userId/delete", authMiddleware, deleteUser);
router.get("/user/:userId/view", authMiddleware, getUserById);
router.patch("/user/:userId/edit", authMiddleware, updateUser);
router.post("/user/register", createUser);
router.post("/user/logout", logoutUser);
router.post("/user/login", loginUser);
router.get("/user/me", authMiddleware, getMe);

// Projects routes
router.delete(
  "/project/:projectId/delete",
  authMiddleware,
  isOwnerMiddleware,
  deleteProject
);
router.patch(
  "/project/:projectId/edit",
  authMiddleware,
  isOwnerMiddleware,
  updateProject
);
router.get(
  "/project/:projectId/view",
  authMiddleware,
  isCollaboratorMiddleware,
  getProjectById
);
router.post("/project/create", authMiddleware, createProject);

export default router;
