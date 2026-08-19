import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';
import { ShieldCheck, Server, Lock, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: `About Us | ${legalConfig.companyName}`,
  description: `Learn about ${legalConfig.companyName}'s mission, technical architecture, and commitment to software privacy and security.`,
  alternates: { canonical: `${legalConfig.website}/about` }
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <div className="border-b border-slate-800 pb-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">About {legalConfig.companyName}</h1>
        <p className="text-sm text-slate-400">
          Built with an uncompromising commitment to production-grade security, data privacy, and transparent legal compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Security-First Architecture</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our applications enforce secret protection, default-deny Firestore security policies, isolated Storage access, and strict server-side authorization for all sensitive financial and admin operations.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <Server className="w-8 h-8 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Cloud Infrastructure</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Powered by Firebase infrastructure, cloud functions, and verified payment processing workflows designed for real-world traffic reliability and data consistency.
          </p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-white">Our Product Mission</h2>
        <p>
          {legalConfig.companyName} provides high-performance digital tools with absolute transparency. We do not engage in deceptive advertising practices, fake regulatory claims, or hidden user tracking.
        </p>

        <h2 className="text-xl font-semibold text-white">Contact & Entity Details</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Legal Entity:</strong> {legalConfig.legalEntityName}</li>
          <li><strong>Jurisdiction:</strong> {legalConfig.country}</li>
          <li><strong>Official Website:</strong> {legalConfig.website}</li>
        </ul>
      </div>
    </main>
  );
}
