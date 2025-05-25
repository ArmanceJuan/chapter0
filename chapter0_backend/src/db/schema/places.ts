import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const places = pgTable("places", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  name: text("name").notNull(),
  description: text("description"),
  history: text("history"),
  location: text("location"),
  imageUrl: text("image_url"),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const placesRelations = relations(places, ({ one }) => ({
  project: one(projects, {
    fields: [places.projectId],
    references: [projects.id],
  }),
}));
