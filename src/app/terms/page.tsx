import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Terms of Service | ${legalConfig.companyName}`,
  description: `Official Terms of Service for ${legalConfig.companyName} governing account registration, subscriptions, acceptable use, and payments.`,
  alternates: {
    canonical: `${legalConfig.website}/terms`
  }
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <div className="border-b border-slate-800 pb-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Terms of Service</h1>
        <p className="text-sm text-slate-400">
          Last Updated: {legalConfig.lastUpdated} | Version: {legalConfig.termsVersion}
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance</h2>
          <p>
            By accessing or using the services provided by {legalConfig.companyName} ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age or the age of legal majority in your jurisdiction to create an account or complete financial transactions. Minors must use the Service under adult supervision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. Promptly notify us of any security breach.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. User Responsibilities</h2>
          <p>
            You agree to use the Service only for lawful purposes and in compliance with all local, national, and international laws, regulations, and third-party terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Acceptable Use</h2>
          <p>
            The Service must be accessed strictly through authorized user interfaces and APIs provided by {legalConfig.companyName}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Prohibited Activities</h2>
          <p>
            Prohibited actions include: reverse engineering software, uploading malware, attempting unauthorized server access, generating artificial advertising traffic, automated scraping, or harassing other users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
          <p>
            All content, source code, logos, trademarks, and design assets are the exclusive property of {legalConfig.legalEntityName} or its licensors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. User Content</h2>
          <p>
            You retain ownership of any content you upload. By uploading content, you grant us a non-exclusive, worldwide license to host and process such content solely to provide the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Advertising</h2>
          <p>
            Free tiers of the Service may present commercial advertisements served by authorized partners. Artificially inflating ad views or clicking ads to support the app is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Payments</h2>
          <p>
            Payments are processed via authorized payment partners (such as Razorpay). Prices are listed inclusive or exclusive of applicable taxes as specified during checkout.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Subscriptions</h2>
          <p>
            Paid subscriptions automatically renew until canceled. Entitlements (such as Remove Ads) remain active during the valid billing cycle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. Refunds</h2>
          <p>
            Refund requests are subject to our dedicated <a href="/refund-policy" className="text-cyan-400 underline">Refund Policy</a> and payment gateway terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">13. Third-Party Services</h2>
          <p>
            The Service integrates third-party tools and SDKs. Your use of third-party platforms is subject to their respective terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">14. Availability</h2>
          <p>
            We strive for high service uptime but do not guarantee uninterrupted or error-free operations. Scheduled maintenance may occur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">15. Account Suspension</h2>
          <p>
            We reserve the right to suspend or restrict accounts that violate security policies, generate fraudulent activity, or fail payment authorization.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">16. Termination</h2>
          <p>
            You may terminate your account at any time via the <a href="/delete-account" className="text-cyan-400 underline">Delete Account</a> page. Upon termination, access rights cease immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">17. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">18. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {legalConfig.companyName} SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">19. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {legalConfig.legalEntityName} from any claims arising out of your violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">20. Changes</h2>
          <p>
            We reserve the right to modify these Terms. Continued use of the Service after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">21. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of {legalConfig.country}, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">22. Contact</h2>
          <p>
            For questions regarding these Terms, contact{' '}
            <a href={`mailto:${legalConfig.supportEmail}`} className="text-cyan-400 underline">{legalConfig.supportEmail}</a>.
          </p>
        </section>

      </div>
    </main>
  );
}
