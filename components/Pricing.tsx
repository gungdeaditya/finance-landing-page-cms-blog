"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const tiers = [
    {
        name: "Starter",
        price: { monthly: 49, yearly: 490 },
        features: ["Basic Analytics", "5 Users", "Email Support", "Data Export"],
    },
    {
        name: "Professional",
        price: { monthly: 199, yearly: 1990 },
        popular: true,
        features: ["Advanced Analytics", "Unlimited Users", "Priority Support", "API Access", "Custom Reports"],
    },
    {
        name: "Enterprise",
        price: { monthly: "Custom", yearly: "Custom" },
        features: ["Dedicated Account Manager", "On-premise Deployment", "SLA", "Custom Integrations"],
    },
];

export default function Pricing() {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    return (
        <section id="pricing" className="py-32 bg-[#000212] border-t border-white/[0.05]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Transparent Pricing
                    </h2>
                    <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                billing === "monthly" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("yearly")}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                billing === "yearly" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                            )}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className={clsx(
                                "p-8 rounded-3xl border flex flex-col relative overflow-hidden",
                                tier.popular
                                    ? "bg-gradient-to-b from-white/[0.08] to-transparent border-white/20"
                                    : "bg-transparent border-white/10"
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                            )}

                            <h3 className="text-xl font-medium mb-2 text-white" style={{ fontFamily: 'var(--font-outfit)' }}>{tier.name}</h3>
                            <div className="text-4xl font-bold mb-6 text-white">
                                {typeof tier.price.monthly === "number"
                                    ? `$${billing === "monthly" ? tier.price.monthly : tier.price.yearly}`
                                    : tier.price.monthly}
                                {typeof tier.price.monthly === "number" && <span className="text-base font-normal text-gray-500 ml-1">/{billing === "monthly" ? "mo" : "yr"}</span>}
                            </div>

                            <div className="w-full h-px bg-white/10 mb-8" />

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <Check size={18} className="text-[#5E6AD2]" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={clsx(
                                "w-full py-3 rounded-xl font-medium text-sm transition-all border",
                                tier.popular
                                    ? "bg-[#5E6AD2] hover:bg-[#4b55aa] text-white border-transparent shadow-[0_0_20px_rgba(94,106,210,0.2)]"
                                    : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                            )}>
                                Choose {tier.name}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
