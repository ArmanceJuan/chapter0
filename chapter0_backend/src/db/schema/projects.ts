import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable("projects", {
  projectId: serial("project_id").primaryKey(),
  title: text("title").notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => users.userId),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  archived: boolean("archived").default(false),
});
