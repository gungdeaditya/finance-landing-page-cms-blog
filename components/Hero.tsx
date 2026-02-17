"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function GeometricShape() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh>
                    <icosahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#1e40af" wireframe transparent opacity={0.3} />
                </mesh>
                <mesh>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.5} />
                </mesh>

                {/* Floating particles representing data points */}
                {Array.from({ length: 20 }).map((_, i) => {
                    const x = (Math.random() - 0.5) * 6;
                    const y = (Math.random() - 0.5) * 6;
                    const z = (Math.random() - 0.5) * 6;
                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <sphereGeometry args={[0.05, 16, 16]} />
                            <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={2} />
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
            <fog attach="fog" args={['#000', 5, 20]} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <GeometricShape />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
                <FinanceScene />
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                >
                    FUTURE FINANCE
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                    Architecting the next generation of financial infrastructure for global tech leaders.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto"
                >
                    <a href="#services" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:bg-gray-200 overflow-hidden">
                        <span className="relative z-10">Explore Solutions</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    </a>
                    <a href="#contact" className="px-8 py-4 bg-transparent border border-white/30 hover:border-white rounded-full font-bold text-lg transition-all text-white hover:bg-white/5 backdrop-blur-sm">
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
