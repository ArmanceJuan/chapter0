import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["owner", "reader", "corrector"]);

export const commentTargetEnum = pgEnum("comment_target", [
  "chapter",
  "place",
  "story_arc",
  "character",
]);
