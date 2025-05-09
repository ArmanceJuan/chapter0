import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { chapters } from "./chapters";

export const chapterVersions = pgTable("chapter_versions", {
  chapterVersionId: serial("chapter_version_id").primaryKey(),
  chapterId: integer("chapter_id")
    .notNull()
    .references(() => chapters.chapterId),
  chapterVersion: integer("chapter_version").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
