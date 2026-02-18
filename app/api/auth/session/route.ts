import { NextResponse } from "next/server";
import { getSessionToken, validateSession } from "@/lib/auth";

// GET /api/auth/session — Validate current session
export async function GET() {
  try {
    const token = await getSessionToken();

    if (!token) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    const user = await validateSession(token);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Session check failed" },
      { status: 500 }
    );
  }
}
