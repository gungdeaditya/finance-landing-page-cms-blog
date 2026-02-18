import { NextResponse } from "next/server";
import { getSessionToken, deleteSession } from "@/lib/auth";

// POST /api/auth/logout — Clear session
export async function POST() {
  try {
    const token = await getSessionToken();

    if (token) {
      await deleteSession(token);
    }

    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    // Clear cookie
    response.cookies.set("cms_session", "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
