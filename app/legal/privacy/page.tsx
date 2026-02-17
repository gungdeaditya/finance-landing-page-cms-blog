export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
                <h1 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>Privacy Policy</h1>
                <div className="space-y-6 leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At FinanceFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, update your profile, or contact customer support.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use your information to provide, maintain, and improve our services, including to process transactions, send you related information, and respond to your comments and questions.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at privacy@financeflow.com.
                    </p>
                </div>
            </div>
        </div>
    );
}
