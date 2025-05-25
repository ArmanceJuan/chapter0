import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const storyArcs = pgTable("story_arcs", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  name: text("name").notNull(),
  description: text("description"),
  linkedArcs: text("linked_arcs"),
  status: boolean("status").default(true),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const storyArcsRelations = relations(storyArcs, ({ one }) => ({
  project: one(projects, {
    fields: [storyArcs.projectId],
    references: [projects.id],
  }),
}));
