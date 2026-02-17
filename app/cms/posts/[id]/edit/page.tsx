"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        coverImage: "",
        content: "",
        author: "",
        status: "draft" as "draft" | "published",
    });

    useEffect(() => {
        // Fetch by listing all posts and finding by id since we need the slug to fetch
        fetch("/api/cms/posts")
            .then((res) => res.json())
            .then((posts) => {
                const post = posts.find((p: any) => p.id === parseInt(postId, 10));
                if (post) {
                    setForm({
                        title: post.title,
                        excerpt: post.excerpt,
                        coverImage: post.coverImage || "",
                        content: post.content,
                        author: post.author,
                        status: post.status,
                    });
                    document.title = `Edit: ${post.title} — CMS | FinanceFlow`;
                } else {
                    setError("Post not found");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load post");
                setLoading(false);
            });
    }, [postId]);

    function slugify(text: string): string {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.title.trim()) {
            setError("Title is required");
            return;
        }
        setSaving(true);
        setError("");

        try {
            const res = await fetch(`/api/cms/posts/${postId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update post");
            }

            router.push("/cms");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-white/[0.05] rounded w-48" />
                <div className="h-12 bg-white/[0.05] rounded-xl" />
                <div className="h-24 bg-white/[0.05] rounded-xl" />
                <div className="h-96 bg-white/[0.05] rounded-xl" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/cms"
                        className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Edit Post
                        </h1>
                        {form.title && (
                            <p className="text-xs text-gray-600 mt-0.5">
                                Slug: {slugify(form.title)}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Enter post title..."
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Excerpt
                    </label>
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        placeholder="Brief description for blog cards..."
                        rows={2}
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all resize-none"
                    />
                </div>

                {/* Cover Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Cover Image URL
                    </label>
                    <input
                        type="url"
                        value={form.coverImage}
                        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
                    />
                    {form.coverImage && (
                        <div className="mt-3 rounded-xl overflow-hidden h-32 border border-white/[0.08]">
                            <img src={form.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                {/* Author & Status row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            placeholder="Author name"
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Status
                        </label>
                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value as "draft" | "published",
                                })
                            }
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all appearance-none"
                        >
                            <option value="draft" className="bg-[#0a0a1a]">
                                Draft
                            </option>
                            <option value="published" className="bg-[#0a0a1a]">
                                Published
                            </option>
                        </select>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Content (Markdown)
                    </label>
                    <div data-color-mode="dark">
                        <MDEditor
                            value={form.content}
                            onChange={(val) => setForm({ ...form, content: val || "" })}
                            height={500}
                            preview="live"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        {saving ? "Saving..." : "Update Post"}
                    </button>
                    <Link
                        href="/cms"
                        className="px-6 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
