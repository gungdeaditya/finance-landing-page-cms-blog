"use client";

import { Globe, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function GlobalCompliancePage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <Link
                    href="/#services"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Features
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 border border-white/20">
                            <Globe size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Global Compliance
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            Automatic regulatory adherence across 50+ jurisdictions. We handle the complexity of local laws so you can focus on expansion.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            Get Started with Global Compliance
                        </Link>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>Key Capabilities</h3>
                        <ul className="space-y-6">
                            {[
                                "Real-time regulatory updates",
                                "Automated KYC/AML checks",
                                "Local tax calculation and withholding",
                                "GDPR and local data privacy compliance"
                            ].map((detail, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <CheckCircle size={24} className="text-green-400 shrink-0 mt-1" />
                                    <span className="text-gray-300 text-lg">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
