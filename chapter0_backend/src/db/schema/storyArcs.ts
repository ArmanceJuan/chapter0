import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const storyArcs = pgTable("story_arcs", {
  storyArcId: serial("story_arc_id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  storyArcTitle: text("story_arc_title").notNull(),
  storyArcDescription: text("story_arc_description"),
  linkedArcs: text("linked_arcs"),
  storyArcStatus: boolean("story_arc_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
