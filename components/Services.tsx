"use client";

import { motion } from "framer-motion";
import { BarChart3, Globe, Shield, Zap } from "lucide-react";

const services = [
    {
        title: "Financial Consulting",
        description: "Strategic advice to optimize your financial operations and growth.",
        icon: BarChart3,
    },
    {
        title: "Tech Solutions",
        description: "Custom software tailored for fintech and enterprise finance.",
        icon: Zap,
    },
    {
        title: "Global Compliance",
        description: "Navigating complex international regulations with ease.",
        icon: Globe,
    },
    {
        title: "Risk Management",
        description: "Advanced analytics to identify and mitigate financial risks.",
        icon: Shield,
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-gray-50 dark:bg-black text-black dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Comprehensive solutions designed for the modern financial landscape.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-800"
                        >
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
