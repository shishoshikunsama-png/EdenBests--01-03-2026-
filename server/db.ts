import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Minimal DB setup that won't crash if DATABASE_URL is missing, 
// since we are using MemStorage and explicitly not using a DB.
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
