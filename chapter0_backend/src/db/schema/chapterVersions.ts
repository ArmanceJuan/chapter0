import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { chapters } from "./chapters";

export const chapterVersions = pgTable("chapter_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  chapterId: uuid("chapter_id")
    .notNull()
    .references(() => chapters.id),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
