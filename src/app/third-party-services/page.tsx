import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Third-Party Services Registry | ${legalConfig.companyName}`,
  description: `Official registry of third-party SDKs, sub-processors, and services integrated into ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/third-party-services` }
};

export default function ThirdPartyServicesPage() {
  const services = [
    {
      name: 'Google Firebase (Auth, Firestore, Storage, Cloud Functions)',
      purpose: 'Backend database, file storage, authentication, and serverless execution.',
      dataCategory: 'Account profile, user IDs, encrypted authentication state, uploaded files.',
      link: 'https://firebase.google.com/support/privacy'
    },
    {
      name: 'Google AdSense / Google AdMob',
      purpose: 'Serving authorized digital advertising in free tiers.',
      dataCategory: 'Device identifiers, IP address, advertising interaction metrics.',
      link: 'https://policies.google.com/technologies/ads'
    },
    {
      name: 'Razorpay Payment Gateway',
      purpose: 'Processing payment transactions, webhook signatures, and subscription billing.',
      dataCategory: 'Payment transaction IDs, currency, order status, billing email.',
      link: 'https://razorpay.com/privacy/'
    },
    {
      name: 'Google Analytics & Firebase Crashlytics',
      purpose: 'Aggregated performance metrics and application crash monitoring.',
      dataCategory: 'Anonymous usage statistics, stack traces, device model, session duration.',
      link: 'https://support.google.com/analytics/answer/6004245'
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Third-Party Services & Sub-processors</h1>
      <p className="text-sm text-slate-400 mb-8">
        We maintain a transparent registry of all external SDKs and sub-processors actively integrated into our platform.
      </p>

      <div className="space-y-6">
        {services.map((s, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h2 className="text-lg font-semibold text-white">{s.name}</h2>
            <p className="text-xs text-slate-300"><strong>Purpose:</strong> {s.purpose}</p>
            <p className="text-xs text-slate-300"><strong>Data Processed:</strong> {s.dataCategory}</p>
            <p className="text-xs">
              <a href={s.link} target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                Official Privacy Documentation &rarr;
              </a>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
