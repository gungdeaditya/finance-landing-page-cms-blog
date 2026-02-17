"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, PlusCircle } from "lucide-react";

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function CMSPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    function fetchPosts() {
        setLoading(true);
        fetch("/api/cms/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    useEffect(() => {
        document.title = "Blog Posts — CMS Dashboard | FinanceFlow";
        fetchPosts();
    }, []);

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setDeleting(id);
        try {
            await fetch(`/api/cms/posts/${id}`, { method: "DELETE" });
            fetchPosts();
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setDeleting(null);
        }
    }

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            const ts = parseInt(dateStr, 10);
            if (!isNaN(ts)) {
                return new Date(ts * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            }
            return "—";
        }
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Blog Posts
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {posts.length} {posts.length === 1 ? "post" : "posts"} total
                    </p>
                </div>
                <Link
                    href="/cms/posts/new"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <PlusCircle size={16} />
                    New Post
                </Link>
            </div>

            {/* Posts table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-16 bg-white/[0.02] rounded-xl border border-white/[0.06] animate-pulse"
                        />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 border border-white/[0.06] rounded-2xl bg-white/[0.01]">
                    <p className="text-gray-500 mb-4">No posts yet.</p>
                    <Link
                        href="/cms/posts/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <PlusCircle size={16} />
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="border border-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.01]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    Title
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                                    Author
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                                    Status
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                                    Date
                                </th>
                                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white">
                                            {post.title}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-0.5 truncate max-w-xs">
                                            {post.excerpt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                                        {post.author}
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${post.status === "published"
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                                        {formatDate(post.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                                                title="View"
                                            >
                                                <Eye size={14} />
                                            </Link>
                                            <Link
                                                href={`/cms/posts/${post.id}/edit`}
                                                className="p-2 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Pencil size={14} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                disabled={deleting === post.id}
                                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
