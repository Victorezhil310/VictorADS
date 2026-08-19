import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';
import { Mail, MessageSquare, Shield, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: `Contact Us | ${legalConfig.companyName}`,
  description: `Contact support, business inquiries, or privacy compliance teams at ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/contact` }
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <div className="border-b border-slate-800 pb-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact Information</h1>
        <p className="text-sm text-slate-400">
          Reach out directly to our support, business operations, or legal compliance teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Support Email */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="p-2.5 bg-slate-800 rounded-xl w-fit text-cyan-400">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-white">Technical Support</h2>
          <p className="text-xs text-slate-400">Assistance with user accounts, bug reports, and features.</p>
          <a
            href={`mailto:${legalConfig.supportEmail}`}
            className="block text-xs font-mono text-cyan-400 hover:underline break-all"
          >
            {legalConfig.supportEmail}
          </a>
        </div>

        {/* Business Email */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="p-2.5 bg-slate-800 rounded-xl w-fit text-amber-400">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-white">Business Operations</h2>
          <p className="text-xs text-slate-400">Partnerships, commercial licensing, and enterprise inquiries.</p>
          <a
            href={`mailto:${legalConfig.businessEmail}`}
            className="block text-xs font-mono text-amber-400 hover:underline break-all"
          >
            {legalConfig.businessEmail}
          </a>
        </div>

        {/* Privacy Email */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="p-2.5 bg-slate-800 rounded-xl w-fit text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-white">Privacy Compliance</h2>
          <p className="text-xs text-slate-400">Data rights requests, legal inquiries, and privacy claims.</p>
          <a
            href={`mailto:${legalConfig.privacyEmail}`}
            className="block text-xs font-mono text-emerald-400 hover:underline break-all"
          >
            {legalConfig.privacyEmail}
          </a>
        </div>

      </div>
    </main>
  );
}
