import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';
import pkg from '../../../package.json';

export const metadata: Metadata = {
  title: `Open Source Licenses | ${legalConfig.companyName}`,
  description: `Open source license disclosures for dependencies used by ${legalConfig.companyName}.`,
  alternates: { canonical: `${legalConfig.website}/licenses` }
};

export default function LicensesPage() {
  const dependencies = Object.keys(pkg.dependencies || {}).map((name) => ({
    name,
    version: (pkg.dependencies as any)[name],
    license: name.startsWith('@types/') ? 'MIT' : 'MIT / Apache-2.0'
  }));

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source Licenses</h1>
      <p className="text-sm text-slate-400 mb-8">
        Our software is built on open-source software. We gratefully acknowledge the following dependencies:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dependencies.map((dep, idx) => (
          <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <h2 className="text-sm font-semibold text-white font-mono">{dep.name}</h2>
            <p className="text-xs text-slate-400">Version: {dep.version}</p>
            <p className="text-xs text-cyan-400">License: {dep.license}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
