import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Advertising Policy | ${legalConfig.companyName}`,
  description: `Official Advertising Policy for ${legalConfig.companyName} detailing ad disclosures, traffic quality rules, and publisher policies.`,
  alternates: { canonical: `${legalConfig.website}/advertising-policy` }
};

export default function AdvertisingPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Advertising Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {legalConfig.lastUpdated}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-white">1. Ad Disclosures & Free Tier Monetization</h2>
        <p>
          Commercial advertisements served by authorized partners (such as Google AdSense and Google AdMob) may appear in free tiers of our applications. Paid subscribers receive an ad-free entitlement.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Traffic Quality & Zero Fraud Tolerance</h2>
        <p>
          We strictly enforce traffic quality standards in compliance with Google Publisher Policies. The following activities are strictly prohibited:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clicking advertisements on your own device or encouraging others to click ads to support the app.</li>
          <li>Generating artificial impressions or clicks via automated scripts, bots, software, or proxy networks.</li>
          <li>Offering incentives, rewards, or financial compensation to users for viewing or interacting with ads.</li>
          <li>Placing ads in deceptive layouts that trigger accidental clicks.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">3. Third-Party Data Processing</h2>
        <p>
          Advertising partners process technical signals (such as device type, IP address, and location) to render relevant advertisements.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Ad Availability</h2>
        <p>
          Ad fill rates and ad availability depend entirely on provider eligibility and geographic coverage. We do not guarantee ad delivery.
        </p>
      </div>
    </main>
  );
}
