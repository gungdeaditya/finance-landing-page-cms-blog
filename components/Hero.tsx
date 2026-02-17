"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function GeometricShape() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main subtle wireframe */}
                <mesh>
                    <icosahedronGeometry args={[2.5, 1]} />
                    <meshBasicMaterial color="#404040" wireframe transparent opacity={0.15} />
                </mesh>

                {/* Inner glowing core */}
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color="#5E6AD2" transparent opacity={0.05} />
                </mesh>

                {/* Floating particles - subtle dust */}
                {Array.from({ length: 40 }).map((_, i) => {
                    const r = 4;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    const x = r * Math.sin(phi) * Math.cos(theta);
                    const y = r * Math.sin(phi) * Math.sin(theta);
                    const z = r * Math.cos(phi);

                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <sphereGeometry args={[0.02, 8, 8]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                        </mesh>
                    );
                })}
            </Float>
        </group>
    );
}

function FinanceScene() {
    return (
        <Canvas className="h-full w-full" camera={{ position: [0, 0, 8] }}>
            <fog attach="fog" args={['#000212', 5, 20]} />
            <ambientLight intensity={0.5} />

            <GeometricShape />
        </Canvas>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000212]">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <FinanceScene />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300"
                >
                    Reimagining Financial Infrastructure
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white drop-shadow-2xl"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                >
                    Precision in <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        Every Transaction.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                    The operating system for modern finance teams. Real-time insights, automated workflows, and global compliance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <a href="#contact" className="group relative px-8 py-3 bg-[#5E6AD2] hover:bg-[#4b55aa] text-white rounded-full font-medium text-lg transition-all shadow-[0_0_20px_rgba(94,106,210,0.3)] hover:shadow-[0_0_30px_rgba(94,106,210,0.5)]">
                        Start Integration
                    </a>
                    <a href="#services" className="px-8 py-3 text-gray-300 hover:text-white font-medium text-lg transition-colors flex items-center gap-2">
                        View Features <span aria-hidden="true">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
