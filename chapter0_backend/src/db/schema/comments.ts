import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { commentTargetEnum } from "./enums";
import { users } from "./users";

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  target: commentTargetEnum("target").notNull(),
  targetId: integer("target_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
