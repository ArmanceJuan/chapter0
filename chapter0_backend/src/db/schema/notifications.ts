import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const notifications = pgTable("notifications", {
  notificationId: uuid("notification_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  notificationContent: text("notification_content").notNull(),
  notificationRead: boolean("notification_read").default(false),
  notificationCreatedAt: timestamp("notification_created_at").defaultNow(),
  notificationUpdatedAt: timestamp("notification_updated_at").defaultNow(),
});
