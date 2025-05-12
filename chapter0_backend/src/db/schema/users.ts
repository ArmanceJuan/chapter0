import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
