import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Copyright & Infringement Policy | ${legalConfig.companyName}`,
  description: `Copyright infringement notice procedures and takedown policy for ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/copyright` }
};

export default function CopyrightPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Copyright & Infringement Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {legalConfig.lastUpdated}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          {legalConfig.companyName} respects the intellectual property rights of creators and content owners. We respond promptly to valid notices of alleged copyright infringement in accordance with applicable copyright laws in {legalConfig.country}.
        </p>

        <h2 className="text-xl font-semibold text-white">1. Submitting a Notice of Infringement</h2>
        <p>
          If you believe that your copyrighted material is hosted or made accessible through our platform without authorization, please submit a written notice containing:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the specific URL or location of the material claimed to be infringing.</li>
          <li>Your full contact information (name, address, telephone number, and email address).</li>
          <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement made under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
        </ol>

        <h2 className="text-xl font-semibold text-white">2. Designated Contact for Notices</h2>
        <p>
          Please send your completed notice to our legal agent at{' '}
          <a href={`mailto:${legalConfig.privacyEmail}`} className="text-cyan-400 underline">{legalConfig.privacyEmail}</a>.
        </p>
      </div>
    </main>
  );
}
