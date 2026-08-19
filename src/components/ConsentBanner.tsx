'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, X, ShieldAlert } from 'lucide-react';
import { ConsentManager, ConsentPreferences } from '@/lib/consent/ConsentManager';

export const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  useEffect(() => {
    const current = ConsentManager.getConsent();
    setConsent(current);
    if (current.state === 'UNKNOWN') {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner || !consent) return null;

  const handleAcceptAll = () => {
    const updated = ConsentManager.acceptAll();
    setConsent(updated);
    setShowBanner(false);
  };

  const handleDenyAll = () => {
    const updated = ConsentManager.denyAll();
    setConsent(updated);
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    const updated = ConsentManager.updateConsent(
      { analytics, personalizedAds },
      'ACCEPTED'
    );
    setConsent(updated);
    setShowBanner(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg shadow-2xl text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-start space-x-4 max-w-3xl">
          <div className="p-2 bg-slate-800 rounded-xl text-cyan-400 shrink-0 mt-1">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-white">Privacy & Cookie Preferences</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We respect your data privacy. Essential cookies are required to operate this application securely. Optional analytics and advertising preferences can be managed below in accordance with our{' '}
              <Link href="/privacy" className="text-cyan-400 underline hover:text-cyan-300">Privacy Policy</Link> and{' '}
              <Link href="/cookies" className="text-cyan-400 underline hover:text-cyan-300">Cookie Policy</Link>.
            </p>
          </div>
        </div>

        {/* Buttons */}
        {!showSettings ? (
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowSettings(true)}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-all"
            >
              Customize Choices
            </button>
            <button
              onClick={handleDenyAll}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-all"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white shadow-lg shadow-cyan-600/20 transition-all"
            >
              Accept All
            </button>
          </div>
        ) : (
          <div className="w-full md:w-auto space-y-4">
            <div className="flex items-center space-x-6 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Usage Analytics</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={personalizedAds}
                  onChange={(e) => setPersonalizedAds(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Personalized Advertising</span>
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveCustom}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-400"
              >
                Back
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
