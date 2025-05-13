import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { roleEnum } from "./enums";

export const invitations = pgTable("invitations", {
  invitationId: uuid("invitation_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.userId),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  invitationEmail: text("invitation_email").notNull(),
  invitationRole: roleEnum("invitation_role").notNull(),
  invitationCreatedAt: timestamp("invitation_created_at").defaultNow(),
  invitationUpdatedAt: timestamp("invitation_updated_at").defaultNow(),
});
