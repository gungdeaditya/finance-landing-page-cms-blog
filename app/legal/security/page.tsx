export default function SecurityPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
                <h1 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>Security</h1>
                <div className="space-y-6 leading-relaxed">
                    <p>
                        Security is our top priority at FinanceFlow. We are committed to protecting your data and maintaining your trust.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Infrastructure Security</h2>
                    <p>
                        Our infrastructure is built on world-class cloud providers with robust physical and network security measures. We use industry-standard encryption protocols to protect data in transit and at rest.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Data Protection</h2>
                    <p>
                        We employ strict access controls and regular security audits to ensure your data remains secure. Our systems are designed to detect and prevent unauthorized access.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Compliance</h2>
                    <p>
                        We comply with major international standards and regulations, including GDPR, SOC 2, and PCI DSS where applicable.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Reporting Vulnerabilities</h2>
                    <p>
                        If you believe you have found a security vulnerability in FinanceFlow, please report it to us at security@financeflow.com. We appreciate your help in keeping our platform secure.
                    </p>
                </div>
            </div>
        </div>
    );
}
