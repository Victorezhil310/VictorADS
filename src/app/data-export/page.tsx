'use client';

import React, { useState, useEffect } from 'react';
import { Download, ShieldCheck, Lock, FileText } from 'lucide-react';
import { auth, db } from '@/lib/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function DataExportPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleExportData = async () => {
    if (!user) return;
    setIsExporting(true);

    try {
      // Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const profileData = userDoc.exists() ? userDoc.data() : {};

      // Filter out internal sensitive admin flags if present
      const safePersonalData = {
        exportTimestamp: new Date().toISOString(),
        accountInfo: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        },
        profileData: {
          displayName: profileData.displayName || user.displayName,
          theme: profileData.theme || 'dark',
          updatedAt: profileData.updatedAt
        }
      };

      // Generate JSON download
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(safePersonalData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `user_data_export_${user.uid.substring(0, 8)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setExportComplete(true);
    } catch (err) {
      console.error('Data export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 text-cyan-400 mb-6">
          <Download className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">Export Personal Data</h1>
        </div>

        {!user ? (
          <div className="space-y-6">
            <p className="text-sm text-slate-300">
              Personal data export requires authentication. Please sign in to request your data archive.
            </p>
            <a
              href="/admin"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/20"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Continue</span>
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              You may download a machine-readable JSON copy of your personal data stored in our system, including your profile information, authentication metadata, and user preferences.
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                <FileText className="w-4 h-4" />
                <span>Archive Includes:</span>
              </div>
              <ul className="list-disc pl-5 text-slate-400 space-y-1">
                <li>Account profile metadata & email registration timestamp</li>
                <li>User preferences and settings</li>
                <li>Public activity and non-sensitive profile state</li>
              </ul>
            </div>

            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20"
            >
              {isExporting ? 'Generating JSON Package...' : 'Download Data Package (JSON)'}
            </button>

            {exportComplete && (
              <p className="text-xs text-emerald-400 bg-emerald-950/30 p-3 rounded-lg border border-emerald-800/50">
                ✅ Download complete. Your personal data export package has been generated.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
