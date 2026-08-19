'use client';

import React, { useState } from 'react';
import { Flag, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { legalConfig } from '@/config/legal.config';

export default function ReportAbusePage() {
  const [category, setCategory] = useState('fraud');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide details regarding the reported abuse.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/report-abuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, description, contactEmail })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit report.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 text-red-400 mb-6">
          <Flag className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">Report Abuse or Fraud</h1>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Category of Abuse</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="fraud">Financial Fraud / Unauthorized Charges</option>
                <option value="spam">Spam / Automated Traffic</option>
                <option value="copyright">Copyright Infringement</option>
                <option value="abusive_content">Abusive or Harmful Content</option>
                <option value="security_issue">Security Vulnerability</option>
                <option value="ad_abuse">Advertising Policy Abuse</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Your Contact Email (Optional)</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Report Details & Evidence</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the incident with relevant URLs, dates, or details..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/30 p-3 rounded-lg border border-red-800/50">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-red-600/20"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Report...' : 'Submit Abuse Report'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Report Received</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thank you for notifying our trust & safety team. We review all reports within 24 hours.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
