import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { invitationStatusEnum, roleEnum } from "./enums";
import { relations } from "drizzle-orm";

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  email: text("email").notNull(),
  role: roleEnum("role").notNull().default("pending"),
  status: invitationStatusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const invitationsRelations = relations(invitations, ({ one }) => ({
  project: one(projects, {
    fields: [invitations.projectId],
    references: [projects.id],
  }),
}));
