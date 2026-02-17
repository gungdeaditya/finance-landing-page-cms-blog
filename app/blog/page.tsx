"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Search } from "lucide-react";

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    author: string;
    createdAt: string;
}

export default function BlogListingPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/cms/posts?status=published")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase())
    );

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            const ts = parseInt(dateStr, 10);
            if (!isNaN(ts)) {
                return new Date(ts * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            }
            return "Unknown date";
        }
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4 block">
                        Our Blog
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Insights & Resources
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg mb-8">
                        Expert perspectives on fintech, cash flow management, and the future
                        of financial technology.
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto relative">
                        <Search
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
                        />
                    </div>
                </motion.div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse"
                            >
                                <div className="h-40 bg-white/[0.05] rounded-xl mb-4" />
                                <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-3" />
                                <div className="h-3 bg-white/[0.05] rounded w-full mb-2" />
                                <div className="h-3 bg-white/[0.05] rounded w-5/6" />
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No articles found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(139,92,246,0.06)]">
                                        {/* Cover image */}
                                        <div className="h-48 relative overflow-hidden">
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#000212]/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/50 text-purple-300 border border-purple-500/20 backdrop-blur-sm">
                                                    Fintech
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Title */}
                                            <h2
                                                className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2"
                                                style={{ fontFamily: "var(--font-outfit)" }}
                                            >
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <User size={12} />
                                                        {post.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {formatDate(post.createdAt)}
                                                    </span>
                                                </div>
                                                <ArrowRight
                                                    size={14}
                                                    className="text-gray-600 group-hover:text-purple-400 transition-all group-hover:translate-x-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
