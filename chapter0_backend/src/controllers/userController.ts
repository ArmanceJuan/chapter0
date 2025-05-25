import { Response, Request } from "express";
import { db, users } from "../db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, username, password, isAdmin } = req.body;
  try {
    if (!email || !username || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser.length > 0) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({ email, username, password: hashedPassword, isAdmin })
      .returning();
    const createdUser = newUser[0];

    const token = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        isAdmin: createdUser.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        isAdmin: createdUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.isAdmin) {
      res.status(403).json({ error: "Forbidden : Your are not an admin" });
      return;
    }
    const allUsers = await db.select().from(users).orderBy(users.username);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
      })
      .from(users)
      .where(eq(users.id, id));
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const id = req.params.id || req.params.userId;
  const { email, username, password, currentPassword } = req.body;
  try {
    console.log("req.user.id controller =", id);
    console.log("req.user.id =", req.user?.id);
    console.log("req.params.id =", req.params.id);

    const user = await db.select().from(users).where(eq(users.id, id));

    if (!req.user || req.user.id !== id) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    }
    if (email && email !== user[0].email) {
      const emailExists = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (emailExists.length > 0 && emailExists[0].id !== id) {
        res.status(400).json({ error: "Email already is not available" });
        return;
      }
    }

    type UserUpdate = {
      email?: string;
      username?: string;
      password?: string;
      updatedAt?: Date;
    };

    const updates: UserUpdate = {};
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (password) {
      if (!currentPassword) {
        res.status(400).json({ error: "Missing password" });
        return;
      }
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user[0].password
      );
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }
    updates.updatedAt = new Date();

    await db.update(users).set(updates).where(eq(users.id, id));

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const promoteToAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.isAdmin) {
      res.status(403).json({ error: "Forbidden : Your are not an admin" });
      return;
    }
    const { id } = req.params;
    const user = await db.select().from(users).where(eq(users.id, id));

    res.status(200).json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await db.select().from(users).where(eq(users.id, id));

    if (!req.user || req.user.id !== id) {
      res.status(403).json({ error: "Forbidden : It's not your account" });
      return;
    }
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await db.delete(users).where(eq(users.id, id));

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        isAdmin: user[0].isAdmin,
        username: user[0].username,
        email: user[0].email,
      },
      JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
        isAdmin: user[0].isAdmin,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!oldPassword || !newPassword) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await db.select().from(users).where(eq(users.id, req.user.id));

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user[0].password);

    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, req.user.id));

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { id, email, username, isAdmin } = req.user;
    res.status(200).json({ id, email, username, isAdmin });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
