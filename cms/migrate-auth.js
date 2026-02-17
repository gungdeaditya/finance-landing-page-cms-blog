// Plain JS migration for auth tables - bypasses tsx/esbuild
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const DATA_DIR = path.join(process.cwd(), "cms", "data");
const DB_PATH = path.join(DATA_DIR, "blog.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");

// Create auth tables
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
  .get();

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

  console.log(
    "✅ Seeded default admin user (username: admin, password: admin123)"
  );
} else {
  console.log("ℹ️  Admin user already exists, skipping seed");
}

console.log("✅ Auth migration complete");
sqlite.close();
