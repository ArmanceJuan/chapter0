import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const characters = pgTable("characters", {
  characterId: uuid("character_id").primaryKey().defaultRandom(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  characterName: text("character_name").notNull(),
  characterDescription: text("character_description"),
  characterHistory: text("character_history"),
  characterpsychologicalProfile: text("character_psychological_profile"),
  characterRelationships: text("character_relationships"),
  characterImageUrl: text("character_image_url"),
  characterStatus: boolean("character_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
