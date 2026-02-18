"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    author: string;
    createdAt: string;
}

export default function BlogPreview() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/posts?status=published")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.slice(0, 3));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            // Handle unix timestamp (number stored as string)
            const ts = parseInt(dateStr, 10);
            if (!isNaN(ts)) {
                return new Date(ts * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            }
            return "Unknown date";
        }
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4 block">
                        Insights & Resources
                    </span>
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Latest from our Blog
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                        Stay ahead with expert insights on fintech trends, cash flow
                        strategies, and compliance best practices.
                    </p>
                </motion.div>

                {/* Blog Cards */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse"
                            >
                                <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-4" />
                                <div className="h-3 bg-white/[0.05] rounded w-full mb-2" />
                                <div className="h-3 bg-white/[0.05] rounded w-5/6 mb-6" />
                                <div className="h-3 bg-white/[0.05] rounded w-1/3" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block">
                                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden h-full transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                                        {/* Cover image */}
                                        <div className="h-40 relative overflow-hidden">
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#000212] via-transparent to-transparent" />
                                            <div className="absolute bottom-3 left-4">
                                                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/50 text-purple-400 border border-purple-500/20 backdrop-blur-sm">
                                                    Fintech
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">

                                            {/* Title */}
                                            <h3
                                                className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2"
                                                style={{ fontFamily: "var(--font-outfit)" }}
                                            >
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
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

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                        View all articles
                        <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
