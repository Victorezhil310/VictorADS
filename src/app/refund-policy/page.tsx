import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Refund Policy | ${legalConfig.companyName}`,
  description: `Official Refund Policy for digital purchases and subscriptions under ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/refund-policy` }
};

export default function RefundPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Refund Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {legalConfig.lastUpdated}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-white">1. Digital Purchases & Services</h2>
        <p>
          Digital product sales, premium subscriptions, and entitlement purchases delivered through {legalConfig.companyName} are generally non-refundable once activated or accessed, except as specified in this policy or required by applicable law.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Subscription Cancellation</h2>
        <p>
          You may cancel your recurring subscription at any time prior to your next billing renewal date. Upon cancellation, your paid entitlements remain active until the conclusion of the current billing cycle.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Exceptional Refund Requests</h2>
        <p>
          Refund requests submitted within 7 days of purchase may be evaluated on a case-by-case basis under the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Duplicate billing or verifiable billing errors.</li>
          <li>Inability to access purchased entitlements due to verified backend system failure.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">4. Payment Gateway & Platform Terms</h2>
        <p>
          Transactions processed via third-party platforms (e.g., Apple App Store, Google Play Store, or Razorpay) are subject to the respective payment provider's refund workflows and platform policies.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Submitting a Claim</h2>
        <p>
          To request a refund review, email{' '}
          <a href={`mailto:${legalConfig.supportEmail}`} className="text-cyan-400 underline">{legalConfig.supportEmail}</a> with your transaction ID, account email, and reason for claim.
        </p>
      </div>
    </main>
  );
}
