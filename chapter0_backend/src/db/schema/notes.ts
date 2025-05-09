import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const notes = pgTable("notes", {
  noteId: serial("note_id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  noteContent: text("note_content").notNull(),
  noteCreatedAt: timestamp("note_created_at").defaultNow(),
  noteUpdatedAt: timestamp("note_updated_at").defaultNow(),
});
