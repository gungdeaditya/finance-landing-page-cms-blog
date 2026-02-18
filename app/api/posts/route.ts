import { NextRequest, NextResponse } from "next/server";
import { listPosts, createPost } from "@/lib/posts";
import { requireAuth } from "@/lib/auth";

// GET /api/posts — List all posts (public, supports ?status= filter)
export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") || undefined;
    const posts = await listPosts(status);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts — Create a new post (auth required)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, coverImage, author, status } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const newPost = await createPost({
      title,
      excerpt,
      content,
      coverImage,
      author,
      status,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);
    if (error?.message?.includes("UNIQUE constraint")) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
