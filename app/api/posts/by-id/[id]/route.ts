import { NextRequest, NextResponse } from "next/server";
import { updatePost, deletePost } from "@/lib/posts";
import { requireAuth } from "@/lib/auth";

// PUT /api/posts/by-id/[id] — Update a post (auth required)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const body = await request.json();
    const { title, excerpt, content, coverImage, author, status } = body;

    const updated = await updatePost(id, {
      title,
      excerpt,
      content,
      coverImage,
      author,
      status,
    });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/by-id/[id] — Delete a post (auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const deleted = await deletePost(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
