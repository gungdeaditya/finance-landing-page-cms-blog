
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#000212] text-white py-16 border-t border-white/[0.05]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>FinanceFlow</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The financial operating system for the next generation of global companies.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Product</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><Link href="/#services" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Legal</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="/legal/security" className="hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()} FinanceFlow Inc. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        {/* Social icons placeholders */}
                        <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors" />
                        <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors" />
                        <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
