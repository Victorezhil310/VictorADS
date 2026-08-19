'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, FileText } from 'lucide-react';

export default function AdminAdsTxtDiagnosticPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const runDiagnostic = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/ads-txt-check');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>ads.txt Diagnostic Tool</span>
          </h1>
          <p className="text-xs text-slate-400">Automated syntax, HTTP 200, duplicate entry, and security inspector for /ads.txt</p>
        </div>
        <button
          onClick={runDiagnostic}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Re-scan File</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Running diagnostic analysis...</div>
      ) : data?.checks ? (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* File Existence */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">/ads.txt File Exists</span>
              {data.checks.adsTxtExists ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            {/* app-ads.txt Existence */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">/app-ads.txt File Exists</span>
              {data.checks.appAdsTxtExists ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            {/* Secret Free */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">No Secrets Detected</span>
              {!data.checks.hasSecrets ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            {/* Syntax Validation */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">IAB Syntax Validated</span>
              {data.checks.validSyntax ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            {/* Publisher ID status */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">Publisher ID Configured</span>
              {data.checks.publisherIdConfigured ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Needs Real ID
                </span>
              )}
            </div>

            {/* Duplicates */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium">No Duplicate Entries</span>
              {data.checks.duplicates.length === 0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <span className="text-xs text-red-400">{data.checks.duplicates.length} Duplicates</span>
              )}
            </div>

          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1 font-mono">
            <p>Direct File Links:</p>
            <p><a href="/ads.txt" target="_blank" className="text-cyan-400 underline">https://YOURDOMAIN.com/ads.txt</a></p>
            <p><a href="/app-ads.txt" target="_blank" className="text-cyan-400 underline">https://YOURDOMAIN.com/app-ads.txt</a></p>
          </div>

        </div>
      ) : null}
    </main>
  );
}
