"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function CMSLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Redirect if already authenticated
        if (localStorage.getItem("cms_authenticated") === "true") {
            router.push("/cms");
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "demo123") {
            localStorage.setItem("cms_authenticated", "true");
            router.push("/cms");
        } else {
            setError("Invalid password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-purple-400" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        CMS Login
                    </h1>
                    <p className="text-gray-500 text-sm">Enter password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
                    >
                        Access CMS
                    </button>
                </form>
            </div>
        </div>
    );
}
