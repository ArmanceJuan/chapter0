import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  description: text("description"),
  history: text("history"),
  psychologicalProfile: text("psychological_profile"),
  relationships: text("relationships"),
  imageUrl: text("image_url"),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const charactersRelations = relations(characters, ({ one }) => ({
  project: one(projects, {
    fields: [characters.projectId],
    references: [projects.id],
  }),
}));
