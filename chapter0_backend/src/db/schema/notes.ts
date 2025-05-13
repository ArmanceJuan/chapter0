import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const notes = pgTable("notes", {
  noteId: uuid("note_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  noteContent: text("note_content").notNull(),
  noteCreatedAt: timestamp("note_created_at").defaultNow(),
  noteUpdatedAt: timestamp("note_updated_at").defaultNow(),
});
