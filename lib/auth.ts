import crypto from "crypto";
import { db, schema } from "./db";
import { eq, and, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";

// ─── Password Hashing ───────────────────────────────────
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const derivedHash = crypto
    .scryptSync(password, salt, KEY_LENGTH)
    .toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(derivedHash, "hex")
  );
}

// ─── User Operations ────────────────────────────────────
export async function findUserByUsername(username: string) {
  const results = await db
    .select()
    .from(schema.cmsUsers)
    .where(eq(schema.cmsUsers.username, username))
    .limit(1);
  return results[0] || null;
}

// ─── Session Operations ─────────────────────────────────
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(schema.cmsSessions).values({
    token,
    userId,
    expiresAt,
  });

  return token;
}

export async function validateSession(token: string) {
  // Find the session first
  const sessions = await db
    .select()
    .from(schema.cmsSessions)
    .where(
      and(
        eq(schema.cmsSessions.token, token),
        gt(schema.cmsSessions.expiresAt, new Date())
      )
    )
    .limit(1);

  if (sessions.length === 0) return null;

  const session = sessions[0];

  // Then find the user
  const users = await db
    .select()
    .from(schema.cmsUsers)
    .where(eq(schema.cmsUsers.id, session.userId))
    .limit(1);

  if (users.length === 0) return null;

  return {
    userId: users[0].id,
    username: users[0].username,
  };
}

export async function deleteSession(token: string): Promise<void> {
  await db
    .delete(schema.cmsSessions)
    .where(eq(schema.cmsSessions.token, token));
}

// ─── Cleanup expired sessions ───────────────────────────
export async function cleanupExpiredSessions(): Promise<void> {
  await db
    .delete(schema.cmsSessions)
    .where(lt(schema.cmsSessions.expiresAt, new Date()));
}

// ─── Extract token from cookies (for Next.js API routes) ─
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("cms_session")?.value;
}

// ─── Require auth middleware for API routes ─────────────
export async function requireAuth(): Promise<{
  userId: number;
  username: string;
} | null> {
  const token = await getSessionToken();
  if (!token) return null;
  return validateSession(token);
}
