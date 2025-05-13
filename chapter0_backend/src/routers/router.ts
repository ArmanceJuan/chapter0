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

const router = Router();

// TODO : Add project users routes
// TODO : Add every all routes : all project users, all characters (d'un projet), all projects (d'un utilisateur) ect

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
router.get(
  "/:projectId/character/all",
  authMiddleware,
  getAllCharactersByProject
);
router.post("/:projectId/character/create", authMiddleware, createCharacter);

// TODO: Add send email for reset password
router.post("/user/:userId/reset-password", authMiddleware, resetPassword);
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
