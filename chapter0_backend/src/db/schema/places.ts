import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const places = pgTable("places", {
  placeId: uuid("place_id").primaryKey().defaultRandom(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  placeName: text("place_name").notNull(),
  placeDescription: text("place_description"),
  placeHistory: text("place_history"),
  placeLocation: text("place_location"),
  placeImageUrl: text("place_image_url"),
  placeStatus: boolean("place_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
