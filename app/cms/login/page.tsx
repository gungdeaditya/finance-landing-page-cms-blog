"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function CMSLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Redirect if already authenticated
        fetch("/api/auth/session", { credentials: "include" })
            .then((res) => {
                if (res.ok) router.push("/cms");
            })
            .catch(() => { });
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // Store token as backup (cookie is primary)
            localStorage.setItem("cms_session", data.token);
            router.push("/cms");
        } catch {
            setError("Network error. Is the CMS server running?");
        } finally {
            setLoading(false);
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
                    <p className="text-gray-500 text-sm">Sign in to manage content</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                autoComplete="username"
                                className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-xs text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
