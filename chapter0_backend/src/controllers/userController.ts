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
  const { email, username, password } = req.body;
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
      .values({ email, username, password: hashedPassword })
      .returning();
    const createdUser = newUser[0];

    const token = jwt.sign({ userId: createdUser.userId }, JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await db
      .select({
        userId: users.userId,
        email: users.email,
        username: users.username,
      })
      .from(users)
      .where(eq(users.userId, id));
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
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, username, password } = req.body;
  try {
    const user = await db.select().from(users).where(eq(users.userId, id));
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    }
    if (email) {
      const emailExists = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (emailExists.length > 0 && emailExists[0].userId !== id) {
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
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }
    updates.updatedAt = new Date();

    await db.update(users).set(updates).where(eq(users.userId, id));

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await db.select().from(users).where(eq(users.userId, id));

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await db.delete(users).where(eq(users.userId, id));

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

    const token = jwt.sign({ userId: user[0].userId }, JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).json({ message: "Login successful", token });
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

// TODO: Implement password reset functionality

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { userId, email, username } = req.user;
    res.status(200).json({ userId, email, username });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
