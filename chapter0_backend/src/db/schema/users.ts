import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { projectUsers } from "./usersProject";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  projectUsers: many(projectUsers),
}));
