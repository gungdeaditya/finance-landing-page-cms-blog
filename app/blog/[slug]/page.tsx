"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    author: string;
    createdAt: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/cms/posts/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

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

    function estimateReadTime(content: string) {
        const words = content.split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    }

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto animate-pulse">
                    <div className="h-4 bg-white/[0.05] rounded w-24 mb-8" />
                    <div className="h-8 bg-white/[0.05] rounded w-3/4 mb-4" />
                    <div className="h-4 bg-white/[0.05] rounded w-1/2 mb-12" />
                    <div className="space-y-3">
                        <div className="h-3 bg-white/[0.05] rounded w-full" />
                        <div className="h-3 bg-white/[0.05] rounded w-5/6" />
                        <div className="h-3 bg-white/[0.05] rounded w-4/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <h1
                        className="text-3xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Post not found
                    </h1>
                    <p className="text-gray-500 mb-6">
                        The article you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
            >
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft
                        size={14}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back to blog
                </Link>

                {/* Cover image */}
                {post.coverImage && (
                    <div className="rounded-2xl overflow-hidden mb-10 h-64 md:h-80 relative">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000212]/60 via-transparent to-transparent" />
                    </div>
                )}

                {/* Article header */}
                <header className="mb-12">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 inline-block">
                        Fintech
                    </span>
                    <h1
                        className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <User size={14} />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {estimateReadTime(post.content)} min read
                        </span>
                    </div>
                </header>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                {/* Article content */}
                <article className="prose-custom">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Footer divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 mb-8" />

                {/* Back link bottom */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft
                        size={14}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back to all articles
                </Link>
            </motion.div>
        </div>
    );
}
