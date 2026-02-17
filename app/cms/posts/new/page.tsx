"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "New Post — CMS Dashboard | FinanceFlow";
    }, []);
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        coverImage: "",
        content: "",
        author: "Admin",
        status: "draft" as "draft" | "published",
    });

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
            const res = await fetch("/api/cms/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create post");
            }

            router.push("/cms");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
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
                            New Post
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
                        {saving ? "Saving..." : "Save Post"}
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
