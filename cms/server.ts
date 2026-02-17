import express from "express";
import cors from "cors";
import { db, schema } from "./db";
import { eq, desc } from "drizzle-orm";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3001;

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "cms", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Helper: generate slug from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── GET /api/posts ──────────────────────────────────────
// List all posts, optionally filtered by status
app.get("/api/posts", async (req, res) => {
  try {
    const { status } = req.query;
    let results;

    if (status === "published" || status === "draft") {
      results = await db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.status, status))
        .orderBy(desc(schema.posts.createdAt));
    } else {
      results = await db
        .select()
        .from(schema.posts)
        .orderBy(desc(schema.posts.createdAt));
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ─── GET /api/posts/:slug ────────────────────────────────
// Get a single post by slug
app.get("/api/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.slug, slug))
      .limit(1);

    if (post.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// ─── POST /api/posts ─────────────────────────────────────
// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, author, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const slug = slugify(title);
    const now = new Date();

    const result = await db.insert(schema.posts).values({
      title,
      slug,
      excerpt: excerpt || "",
      content: content || "",
      coverImage: coverImage || null,
      author: author || "Admin",
      status: status || "draft",
      createdAt: now,
      updatedAt: now,
    });

    const newPost = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.slug, slug))
      .limit(1);

    res.status(201).json(newPost[0]);
  } catch (error: any) {
    console.error("Error creating post:", error);
    if (error?.message?.includes("UNIQUE constraint")) {
      return res
        .status(409)
        .json({ error: "A post with this title already exists" });
    }
    res.status(500).json({ error: "Failed to create post" });
  }
});

// ─── PUT /api/posts/:id ──────────────────────────────────
// Update existing post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, excerpt, content, coverImage, author, status } = req.body;

    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = slugify(title);
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (author !== undefined) updateData.author = author;
    if (status !== undefined) updateData.status = status;

    await db
      .update(schema.posts)
      .set(updateData)
      .where(eq(schema.posts.id, id));

    const updated = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    if (updated.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updated[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ─── DELETE /api/posts/:id ───────────────────────────────
// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const existing = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    await db.delete(schema.posts).where(eq(schema.posts.id, id));

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CMS API server running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   GET    /api/posts`);
  console.log(`   GET    /api/posts/:slug`);
  console.log(`   POST   /api/posts`);
  console.log(`   PUT    /api/posts/:id`);
  console.log(`   DELETE /api/posts/:id`);
});
