"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Globe, Shield, Zap, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";

const services = [
    {
        title: "Global Compliance",
        slug: "global-compliance",
        description: "Automatic regulatory adherence across 50+ jurisdictions.",
        icon: Globe,
        colSpan: "md:col-span-2",
    },
    {
        title: "Real-time Analytics",
        slug: "real-time-analytics",
        description: "Process millions of data points with sub-second latency.",
        icon: BarChart3,
        colSpan: "md:col-span-1",
    },
    {
        title: "Risk Management",
        slug: "risk-management",
        description: "AI-driven fraud detection and risk scoring models.",
        icon: Shield,
        colSpan: "md:col-span-1",
    },
    {
        title: "API-First Platform",
        slug: "api-first-platform",
        description: "Seamless integration with your existing tech stack. Developer-friendly documentation and SDKs.",
        icon: Zap,
        colSpan: "md:col-span-2",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 bg-[#000212] relative">
            {/* Background Glow */}
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[60%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Powering the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Financial Web</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Built for scale, security, and speed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Link
                            href={`/features/${service.slug}`}
                            key={index}
                            className={clsx(
                                "group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden block",
                                service.colSpan
                            )}
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06),transparent_40%)]" />

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <service.icon size={24} />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-8 flex-grow" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                    {service.description}
                                </p>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-medium text-white/70">
                                    Learn more <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
