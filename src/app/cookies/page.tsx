import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Cookie Policy | ${legalConfig.companyName}`,
  description: `Learn how ${legalConfig.companyName} uses essential, analytics, and advertising cookies.`,
  alternates: { canonical: `${legalConfig.website}/cookies` }
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Cookie Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {legalConfig.lastUpdated}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          This Cookie Policy explains how {legalConfig.companyName} uses cookies and similar storage technologies to recognize you when you visit our website and web applications.
        </p>

        <h2 className="text-xl font-semibold text-white">1. Essential Cookies</h2>
        <p>
          Essential cookies and session tokens are strictly required for security, authentication, and platform stability. They cannot be disabled in our systems.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Authentication Cookies</h2>
        <p>
          Firebase Authentication uses secure tokens stored in local storage and cookies to maintain your signed-in state across browsing sessions.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Analytics Cookies</h2>
        <p>
          Analytics cookies allow us to track aggregated usage patterns and error reports via Google Analytics and Firebase Analytics. You can opt out via our Consent Manager.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Advertising Cookies</h2>
        <p>
          Authorized advertising partners (e.g., Google AdSense) may place cookies to serve non-personalized or personalized advertising based on your consent preferences.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Managing Cookie Preferences</h2>
        <p>
          You can update or withdraw your consent choices at any time using the banner at the bottom of the page or through your web browser's cookie settings.
        </p>
      </div>
    </main>
  );
}
