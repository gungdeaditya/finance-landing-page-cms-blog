
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#000212]/80 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
            <Link href="/" className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              FinanceFlow
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              <Link href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Company
              </Link>
            </div>
          </div>
          <div>
            <Link href="#contact" className="text-sm bg-white text-black hover:bg-gray-200 px-4 py-1.5 rounded-full font-medium transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
