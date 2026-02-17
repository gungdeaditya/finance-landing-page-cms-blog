export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">FinanceFlow</span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        We are building the financial infrastructure for the internet. Our mission is to increase the GDP of the internet by providing better financial tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Our Story</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Founded in 2024, FinanceFlow started with a simple idea: make financial data accessible and actionable.
                            We realized that traditional banking infrastructure wasn't built for the digital age, so we decided to build it ourselves.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Today, we process billions of dollars annually for thousands of forward-thinking companies around the globe.
                        </p>
                    </div>
                    <div className="h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 flex items-center justify-center">
                        {/* Placeholder for an image or graphic */}
                        <div className="text-white/20 font-bold text-xl">Mission Graphic</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                        <div className="text-gray-400">Countries Supported</div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="text-4xl font-bold text-purple-400 mb-2">$10B+</div>
                        <div className="text-gray-400">Transaction Volume</div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                        <div className="text-4xl font-bold text-pink-400 mb-2">99.99%</div>
                        <div className="text-gray-400">Uptime Reliability</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
