import { db, schema } from "../db";
import { eq, desc } from "drizzle-orm";

// ─── Helpers ─────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Types ───────────────────────────────────────────────

export interface CreatePostInput {
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  author?: string;
  status?: "draft" | "published";
}

export interface UpdatePostInput {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  author?: string;
  status?: "draft" | "published";
}

// ─── Service Methods ─────────────────────────────────────

/**
 * List all posts, optionally filtered by status.
 */
export async function listPosts(status?: string) {
  if (status === "published" || status === "draft") {
    return db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.status, status))
      .orderBy(desc(schema.posts.createdAt));
  }

  return db
    .select()
    .from(schema.posts)
    .orderBy(desc(schema.posts.createdAt));
}

/**
 * Get a single post by its slug.
 */
export async function getPostBySlug(slug: string) {
  const results = await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.slug, slug))
    .limit(1);

  return results[0] ?? null;
}

/**
 * Get a single post by its ID.
 */
export async function getPostById(id: number) {
  const results = await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .limit(1);

  return results[0] ?? null;
}

/**
 * Create a new post. Throws on duplicate slug.
 */
export async function createPost(input: CreatePostInput) {
  const slug = slugify(input.title);
  const now = new Date();

  await db.insert(schema.posts).values({
    title: input.title,
    slug,
    excerpt: input.excerpt || "",
    content: input.content || "",
    coverImage: input.coverImage || null,
    author: input.author || "Admin",
    status: input.status || "draft",
    createdAt: now,
    updatedAt: now,
  });

  return getPostBySlug(slug);
}

/**
 * Update an existing post by ID. Returns the updated post or null if not found.
 */
export async function updatePost(id: number, input: UpdatePostInput) {
  const updateData: Record<string, any> = { updatedAt: new Date() };

  if (input.title !== undefined) {
    updateData.title = input.title;
    updateData.slug = slugify(input.title);
  }
  if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
  if (input.content !== undefined) updateData.content = input.content;
  if (input.coverImage !== undefined) updateData.coverImage = input.coverImage;
  if (input.author !== undefined) updateData.author = input.author;
  if (input.status !== undefined) updateData.status = input.status;

  await db
    .update(schema.posts)
    .set(updateData)
    .where(eq(schema.posts.id, id));

  return getPostById(id);
}

/**
 * Delete a post by ID. Returns true if deleted, false if not found.
 */
export async function deletePost(id: number): Promise<boolean> {
  const existing = await getPostById(id);
  if (!existing) return false;

  await db.delete(schema.posts).where(eq(schema.posts.id, id));
  return true;
}
