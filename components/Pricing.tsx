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
        <section id="pricing" className="py-24 bg-white dark:bg-neutral-900 text-black dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className={clsx("text-lg", billing === "monthly" ? "font-bold" : "text-gray-500")}>Monthly</span>
                        <button
                            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                            className="w-14 h-8 bg-blue-600 rounded-full p-1 relative transition-colors"
                        >
                            <motion.div
                                layout
                                className="w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{ x: billing === "monthly" ? 0 : 24 }}
                            />
                        </button>
                        <span className={clsx("text-lg", billing === "yearly" ? "font-bold" : "text-gray-500")}>Yearly <span className="text-sm text-green-500 font-normal">(Save 20%)</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={clsx(
                                "p-8 rounded-3xl border relative flex flex-col",
                                tier.popular
                                    ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow-2xl scale-105 z-10"
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                            <div className="text-4xl font-bold mb-6">
                                {typeof tier.price.monthly === "number"
                                    ? `$${billing === "monthly" ? tier.price.monthly : tier.price.yearly}`
                                    : tier.price.monthly}
                                {typeof tier.price.monthly === "number" && <span className="text-lg font-normal opacity-70">/{billing === "monthly" ? "mo" : "yr"}</span>}
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check size={20} className={tier.popular ? "text-blue-400 dark:text-blue-600" : "text-blue-600 dark:text-blue-400"} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={clsx(
                                "w-full py-3 rounded-xl font-bold transition-transform active:scale-95",
                                tier.popular
                                    ? "bg-white text-black dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                                    : "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                            )}>
                                Choose Plan
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
