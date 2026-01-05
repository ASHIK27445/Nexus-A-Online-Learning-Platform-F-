// TermsOfService.jsx
import React from 'react';
import { Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
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
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 rounded-full mb-6">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Legal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Terms of </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black/50 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-500/10">
          
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome to OLP Academy</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of OLP Academy's website, 
              courses, and services ("Services"). By accessing or using our Services, you agree to be bound 
              by these Terms. If you disagree with any part of the terms, you may not access the Services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Account Terms */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                1. Account Terms
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>You must be at least 13 years old to use our Services.</p>
                <p>You are responsible for maintaining the security of your account and password.</p>
                <p>You must provide accurate and complete information when creating an account.</p>
                <p>You are responsible for all activity that occurs under your account.</p>
              </div>
            </section>

            {/* Course Access */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                2. Course Access and Usage
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Course access is granted for personal, non-commercial use only.</p>
                <p>You may not share your account credentials or course materials with others.</p>
                <p>All course content is protected by copyright and intellectual property laws.</p>
                <p>We reserve the right to revoke access for violation of these terms.</p>
              </div>
            </section>

            {/* Payments */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                3. Payments and Refunds
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>All fees are stated in USD and are non-refundable unless otherwise specified.</p>
                <p>We offer a 30-day money-back guarantee for certain courses.</p>
                <p>Subscription fees are billed on a recurring basis until canceled.</p>
                <p>You can cancel your subscription at any time through your account settings.</p>
              </div>
            </section>

            {/* User Content */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                4. User Content
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>You retain ownership of any content you submit to our platform.</p>
                <p>By submitting content, you grant us a license to use it for platform purposes.</p>
                <p>You are responsible for ensuring your content does not violate any laws or third-party rights.</p>
                <p>We reserve the right to remove any content that violates these terms.</p>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                5. Prohibited Activities
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Attempting to hack, disrupt, or overload our Services</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Scraping or copying course content without permission</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Sharing account credentials or course access</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Posting harmful, abusive, or illegal content</p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                6. Limitation of Liability
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Our Services are provided "as is" without warranties of any kind.</p>
                <p>We are not liable for any indirect, incidental, or consequential damages.</p>
                <p>Our total liability is limited to the amount you paid for the Services.</p>
                <p>We do not guarantee job placement or specific career outcomes.</p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-amber-400" />
                7. Changes to Terms
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>We may update these Terms from time to time.</p>
                <p>We will notify you of significant changes via email or platform notification.</p>
                <p>Continued use of our Services after changes constitutes acceptance.</p>
                <p>The "Last Updated" date at the top indicates when changes were made.</p>
              </div>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-16 p-6 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-amber-400 mt-2">legal@nexusacademy.com</p>
          </div>

          {/* Acceptance */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              By using our Services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;