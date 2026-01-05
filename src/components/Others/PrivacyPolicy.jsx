// PrivacyPolicy.jsx
import React from 'react';
import { Shield, Lock, Eye, Database, Mail, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "December 25, 2025";

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <Lock className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Privacy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Privacy </span>
            <span className="bg-linear-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black/50 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/10">
          
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-blue-400/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Your Privacy Matters</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              At OLP Academy, we are committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our Services. 
              Please read this policy carefully. If you do not agree with the terms, please do not access our Services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-400" />
                1. Information We Collect
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Personal Information</h4>
                  <ul className="space-y-2 text-gray-300 pl-5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                      <span>Name, email address, and contact information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                      <span>Billing and payment information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                      <span>Account credentials and profile information</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Usage Information</h4>
                  <ul className="space-y-2 text-gray-300 pl-5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                      <span>Course progress and completion data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                      <span>Device information and browser type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                      <span>IP address and location data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                2. How We Use Your Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Service Delivery</h4>
                  <p className="text-sm text-gray-300">To provide and maintain our courses and services</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Personalization</h4>
                  <p className="text-sm text-gray-300">To customize your learning experience</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Communication</h4>
                  <p className="text-sm text-gray-300">To send updates, newsletters, and important notices</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Improvements</h4>
                  <p className="text-sm text-gray-300">To enhance and optimize our platform</p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-blue-400" />
                3. Data Sharing and Disclosure
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Service Providers:</strong> We share data with trusted partners who assist in operating our platform.</p>
                <p><strong>Legal Requirements:</strong> We may disclose information when required by law.</p>
                <p><strong>Business Transfers:</strong> Information may be transferred during mergers or acquisitions.</p>
                <p><strong>With Your Consent:</strong> We share information when you give us explicit permission.</p>
                <p className="text-sm text-blue-300 mt-4">
                  We never sell your personal information to third parties.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" />
                4. Data Security
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>We implement industry-standard security measures to protect your data.</p>
                <p>All sensitive information is encrypted during transmission and storage.</p>
                <p>Regular security audits and vulnerability assessments are conducted.</p>
                <p>Access to personal data is restricted to authorized personnel only.</p>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-sm text-blue-300">
                    While we strive to protect your information, no security system is impenetrable. 
                    We cannot guarantee the absolute security of your data.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-blue-400" />
                5. Your Privacy Rights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">A</span>
                  </div>
                  <span className="text-white">Access your data</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">C</span>
                  </div>
                  <span className="text-white">Correct inaccuracies</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">D</span>
                  </div>
                  <span className="text-white">Delete your data</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">O</span>
                  </div>
                  <span className="text-white">Opt-out of marketing</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                To exercise these rights, contact us at privacy@olpacademy.com
              </p>
            </section>

            {/* Cookies */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                6. Cookies and Tracking
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>We use cookies and similar technologies to enhance your experience.</p>
                <p>Cookies help us remember your preferences and analyze site traffic.</p>
                <p>You can control cookie settings through your browser preferences.</p>
                <p>Essential cookies are required for the platform to function properly.</p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-blue-400" />
                7. Children's Privacy
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Our Services are not intended for children under 13 years of age.</p>
                <p>We do not knowingly collect information from children under 13.</p>
                <p>If we discover we have collected information from a child under 13, we will delete it immediately.</p>
                <p>Parents or guardians should contact us if they believe their child has provided personal information.</p>
              </div>
            </section>
          </div>

          {/* Contact and Updates */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Contact Us</h3>
              </div>
              <p className="text-gray-300 mb-2">For privacy-related inquiries:</p>
              <p className="text-blue-400">privacy@nexusacademy.com</p>
            </div>
            <div className="p-6 bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Policy Updates</h3>
              <p className="text-gray-300">
                We may update this policy periodically. We will notify you of significant changes 
                via email or platform notification. Please review this policy regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;