import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const chapters = pgTable("chapters", {
  chapterId: uuid("chapter_id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  chapterTitle: text("chapter_title").notNull(),
  chapterNumber: integer("chapter_number").notNull(),
  chapterContent: text("chapter_content"),
  chapterVersion: integer("chapter_version").notNull(),
  chapterStatus: boolean("chapter_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
