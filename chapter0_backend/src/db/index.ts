import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export const {
  users,
  projects,
  projectUsers,
  chapters,
  characters,
  places,
  storyArcs,
  invitations,
  comments,
  notifications,
  notes,
  chapterVersions,
} = schema;
