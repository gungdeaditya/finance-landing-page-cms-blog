
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
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-300">Legal</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
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
