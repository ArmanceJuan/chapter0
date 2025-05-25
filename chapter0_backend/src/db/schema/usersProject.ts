import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { roleEnum } from "./enums";
import { relations } from "drizzle-orm";

export const projectUsers = pgTable(
  "project_users",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id),
    role: roleEnum("role").notNull().default("pending"),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.projectId] })]
);

export const projectUsersRelations = relations(projectUsers, ({ one }) => ({
  user: one(users, {
    fields: [projectUsers.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [projectUsers.projectId],
    references: [projects.id],
  }),
}));
