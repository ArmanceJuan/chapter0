import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { commentTargetEnum } from "./enums";
import { users } from "./users";

export const comments = pgTable("comments", {
  commentId: uuid("comment_id").primaryKey().defaultRandom(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  commentContent: text("comment_content").notNull(),
  commentTarget: commentTargetEnum("comment_target").notNull(),
  commentTargetId: integer("comment_target_id").notNull(),
  commentCreatedAt: timestamp("comment_created_at").defaultNow(),
  commentUpdatedAt: timestamp("comment_updated_at").defaultNow(),
});
