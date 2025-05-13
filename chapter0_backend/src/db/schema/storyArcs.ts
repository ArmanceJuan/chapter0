import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const storyArcs = pgTable("story_arcs", {
  storyArcId: uuid("story_arc_id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  storyArcTitle: text("story_arc_title").notNull(),
  storyArcDescription: text("story_arc_description"),
  linkedArcs: text("linked_arcs"),
  storyArcStatus: boolean("story_arc_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
