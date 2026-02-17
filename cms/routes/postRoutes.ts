import { Router } from "express";
import {
  listPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService";

const router = Router();

// ─── GET /api/posts ──────────────────────────────────────
// List all posts, optionally filtered by ?status=published|draft
router.get("/", async (req, res) => {
  try {
    const status = req.query.status as string | undefined;
    const posts = await listPosts(status);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ─── GET /api/posts/:slug ────────────────────────────────
// Get a single post by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// ─── POST /api/posts ─────────────────────────────────────
// Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, author, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newPost = await createPost({
      title,
      excerpt,
      content,
      coverImage,
      author,
      status,
    });

    res.status(201).json(newPost);
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
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, excerpt, content, coverImage, author, status } = req.body;

    const updated = await updatePost(id, {
      title,
      excerpt,
      content,
      coverImage,
      author,
      status,
    });

    if (!updated) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ─── DELETE /api/posts/:id ───────────────────────────────
// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await deletePost(id);

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
