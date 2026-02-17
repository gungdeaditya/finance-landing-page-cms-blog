import { Router } from "express";
import {
  findUserByUsername,
  verifyPassword,
  createSession,
  deleteSession,
  validateSession,
} from "../services/authService";

const router = Router();

// Helper to parse cookies
function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      cookies[name.trim()] = decodeURIComponent(rest.join("=").trim());
    }
  });
  return cookies;
}

// Helper to extract token from request
function extractToken(req: any): string | undefined {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookies = parseCookies(req.headers.cookie);
  return cookies["cms_session"];
}

// ─── POST /api/auth/login ────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = await createSession(user.id);

    // Set cookie (7 days)
    res.setHeader(
      "Set-Cookie",
      `cms_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
    );

    res.json({
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── POST /api/auth/logout ───────────────────────────────
router.post("/logout", async (req, res) => {
  try {
    const token = extractToken(req);

    if (token) {
      await deleteSession(token);
    }

    // Clear cookie
    res.setHeader(
      "Set-Cookie",
      `cms_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
    );

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});

// ─── GET /api/auth/session ───────────────────────────────
router.get("/session", async (req, res) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ error: "No session" });
    }

    const user = await validateSession(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Session check error:", error);
    res.status(500).json({ error: "Session check failed" });
  }
});

export default router;
