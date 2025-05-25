import { pgEnum } from "drizzle-orm/pg-core";

export type Role = "owner" | "reader" | "corrector" | "pending";
export const roleEnum = pgEnum("role", [
  "owner",
  "reader",
  "corrector",
  "pending",
]);

export const commentTargetEnum = pgEnum("target", [
  "chapter",
  "place",
  "story_arc",
  "character",
]);

export const invitationStatusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "expired",
  "canceled",
  "rejected",
]);
