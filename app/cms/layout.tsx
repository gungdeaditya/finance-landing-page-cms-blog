"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, PlusCircle, Home, LogOut } from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Skip auth check on login page
        if (pathname === "/cms/login") {
            setIsAuthenticated(true);
            return;
        }

        const auth = localStorage.getItem("cms_authenticated");
        if (!auth) {
            router.push("/cms/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("cms_authenticated");
        router.push("/cms/login");
    };

    // If on login page, render children without sidebar
    if (pathname === "/cms/login") {
        return <>{children}</>;
    }

    // Prevent flashing content while checking auth
    if (!isAuthenticated) {
        return null;
    }

    const navItems = [
        { href: "/cms", label: "All Posts", icon: FileText },
        { href: "/cms/posts/new", label: "New Post", icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen pt-14 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/[0.06] bg-white/[0.01] fixed top-14 bottom-0 left-0 p-4 hidden md:block">
                <div className="mb-6">
                    <h2
                        className="text-sm font-bold text-white tracking-tight px-3 mb-1"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        CMS Dashboard
                    </h2>
                    <p className="text-[10px] text-gray-600 px-3">Manage your blog content</p>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                                    }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-white/[0.04] transition-all text-left"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-white hover:bg-white/[0.04] transition-all"
                    >
                        <Home size={16} />
                        Back to site
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 md:ml-64 p-6 md:p-8">
                {/* Mobile nav */}
                <div className="md:hidden flex gap-2 mb-6 overflow-x-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${isActive
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : "text-gray-500 border border-white/[0.06] hover:text-white"
                                    }`}
                            >
                                <item.icon size={12} />
                                {item.label}
                            </Link>
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap text-gray-500 border border-white/[0.06] hover:text-red-400 transition-all"
                    >
                        <LogOut size={12} />
                        Logout
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap text-gray-500 border border-white/[0.06] hover:text-white transition-all"
                    >
                        <Home size={12} />
                        Site
                    </Link>
                </div>
                {children}
            </main>
        </div>
    );
}
