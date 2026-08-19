import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';
import { ShieldCheck, Lock, FileCode2, KeyRound, AlertOctagon } from 'lucide-react';

export const metadata: Metadata = {
  title: `Security Architecture | ${legalConfig.companyName}`,
  description: `Technical overview of authentication, encryption, Firestore security rules, and vulnerability reporting at ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/security` }
};

export default function SecurityPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <div className="border-b border-slate-800 pb-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Security Overview & Protection Layer</h1>
        <p className="text-sm text-slate-400">
          Transparent technical overview of our defensive security practices, encryption standards, and server authorization controls.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <Lock className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-white">1. Transport Layer Security & Encryption</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All HTTP traffic is transmitted exclusively over HTTPS enforced with HSTS (Strict-Transport-Security) headers. Data at rest in Cloud Firestore and Storage is protected by managed Google Cloud KMS encryption. We avoid unsubstantiated marketing phrases like "military-grade encryption."
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <KeyRound className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-white">2. Secret Protection & Pre-Build Scanning</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Private credentials (database passwords, Razorpay secrets, Firebase Admin keys) are stored strictly in server-side environment variables. Every production build executes an automated secret scanning tool that inspects source files for committed API secrets.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <FileCode2 className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-white">3. Firestore & Storage Access Controls</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our Firestore security rules follow a strict default-deny principle. Users can only modify non-restricted profile fields. Client-side mutations of billing status, roles, or revenue logs are blocked at the database layer.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <AlertOctagon className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-white">4. Responsible Vulnerability Disclosure</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you discover a potential security flaw in our application, please report it responsibly to{' '}
            <a href={`mailto:${legalConfig.privacyEmail}`} className="text-cyan-400 underline">{legalConfig.privacyEmail}</a>. Please include step-by-step reproduction details.
          </p>
        </div>

      </div>
    </main>
  );
}
