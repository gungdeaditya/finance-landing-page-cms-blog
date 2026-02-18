import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../cms/db/schema";
import path from "path";

/**
 * Unified database connection.
 * - Local dev: uses better-sqlite3 (file-based SQLite)
 * - Production (Vercel): uses libSQL client connecting to Turso
 */
function createDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl && !databaseUrl.startsWith("file:")) {
    // Production: use libSQL / Turso
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require("@libsql/client");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle: drizzleLibsql } = require("drizzle-orm/libsql");
    const client = createClient({
      url: databaseUrl,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    return drizzleLibsql(client, { schema });
  }

  // Local development: use better-sqlite3
  const dbPath = databaseUrl
    ? databaseUrl.replace("file:", "")
    : path.join(process.cwd(), "cms", "data", "blog.db");

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  return drizzle(sqlite, { schema });
}

// Singleton pattern — reuse across API route invocations
const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDb>;
};

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

export { schema };

