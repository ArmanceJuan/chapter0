import { pgTable, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { roleEnum } from "./enums";

export const projectUsers = pgTable(
  "project_users",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.userId),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.projectId),
    role: roleEnum("role").notNull().default("reader"),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.projectId] })]
);
