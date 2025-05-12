import { Router } from "express";
import {
  getAllUsers,
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

const router = Router();

router.post("/user/reset-password", authMiddleware, resetPassword);

router.delete("/user/:id/delete", authMiddleware, deleteUser);

router.get("/user/:id/view", authMiddleware, getUserById);

router.put("/user/:id/edit", authMiddleware, updateUser);

router.post("/user/register", createUser);
router.post("/user/logout", authMiddleware, logoutUser);
router.post("/user/login", loginUser);
router.get("/user/me", authMiddleware, getMe);

export default router;
