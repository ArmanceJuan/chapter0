import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { chapters } from "./chapters";
import { invitations } from "./invitations";
import { characters } from "./characters";
import { places } from "./places";
import { storyArcs } from "./storyArcs";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("title").notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  ownerName: text("owner_name")
    .default("")
    .references(() => users.username),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  archived: boolean("archived").default(false),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  chapters: many(chapters),
  characters: many(characters),
  users: many(users),
  places: many(places),
  storyArcs: many(storyArcs),
  invitations: many(invitations),
  owner: many(users),
}));
