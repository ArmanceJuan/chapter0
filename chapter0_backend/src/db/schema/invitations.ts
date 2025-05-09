import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { roleEnum } from "./enums";

export const invitations = pgTable("invitations", {
  invitationId: serial("invitation_id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.projectId),
  invitationEmail: text("invitation_email").notNull(),
  invitationRole: roleEnum("invitation_role").notNull(),
  invitationCreatedAt: timestamp("invitation_created_at").defaultNow(),
  invitationUpdatedAt: timestamp("invitation_updated_at").defaultNow(),
});
