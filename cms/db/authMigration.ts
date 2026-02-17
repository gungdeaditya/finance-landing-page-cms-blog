import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import crypto from "crypto";

/**
 * Run auth table migrations on server startup.
 * This ensures the cms_users and cms_sessions tables exist
 * and seeds a default admin user if none exists.
 */
export function runAuthMigrations() {
  const DATA_DIR = path.join(process.cwd(), "cms", "data");
  const DB_PATH = path.join(DATA_DIR, "blog.db");

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");

  // Create auth tables (idempotent)
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS cms_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS cms_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL REFERENCES cms_users(id),
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);

  // Seed default admin user if no users exist
  const userCount = sqlite
    .prepare("SELECT COUNT(*) as count FROM cms_users")
    .get() as { count: number };

  if (userCount.count === 0) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync("admin123", salt, 64).toString("hex");
    const passwordHash = `${salt}:${hash}`;
    const now = Math.floor(Date.now() / 1000);

    sqlite
      .prepare(
        "INSERT INTO cms_users (username, password_hash, created_at) VALUES (?, ?, ?)"
      )
      .run("admin", passwordHash, now);

    console.log("✅ Seeded default admin user (username: admin, password: admin123)");
  }

  sqlite.close();
  console.log("✅ Auth tables ready");
}
