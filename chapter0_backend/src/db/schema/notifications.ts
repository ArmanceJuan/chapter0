import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const notifications = pgTable("notifications", {
  notificationId: serial("notification_id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  notificationContent: text("notification_content").notNull(),
  notificationRead: boolean("notification_read").default(false),
  notificationCreatedAt: timestamp("notification_created_at").defaultNow(),
  notificationUpdatedAt: timestamp("notification_updated_at").defaultNow(),
});
