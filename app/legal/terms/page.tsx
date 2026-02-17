export default function TermsPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
                <h1 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>Terms of Service</h1>
                <div className="space-y-6 leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        Please read these Terms of Service carefully before using FinanceFlow. By using our services, you agree to be bound by these terms.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of FinanceFlow and its licensors.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Termination</h2>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
