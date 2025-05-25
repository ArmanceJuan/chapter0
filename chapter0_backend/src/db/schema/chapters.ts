import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const chapters = pgTable("chapters", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  content: text("content"),
  version: integer("version").notNull(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chaptersRelations = relations(chapters, ({ one }) => ({
  project: one(projects, {
    fields: [chapters.projectId],
    references: [projects.id],
  }),
}));
