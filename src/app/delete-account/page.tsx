'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, CheckCircle, Lock, LogOut } from 'lucide-react';
import { auth, db, storage } from '@/lib/firebase/config';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';

export default function DeleteAccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState<'AUTH' | 'CONFIRM' | 'PROCESSING' | 'COMPLETED'>('AUTH');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setStep('CONFIRM');
      } else {
        setStep('AUTH');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (confirmText !== 'DELETE') {
      setError('Please type "DELETE" exactly to confirm account deletion.');
      return;
    }

    setIsDeleting(true);
    setError(null);
    setStep('PROCESSING');

    try {
      const uid = user.uid;

      // 1. Record Deletion Audit Event (preserving legally mandated log)
      await setDoc(doc(db, 'auditLogs', `deletion_${uid}_${Date.now()}`), {
        action: 'USER_ACCOUNT_DELETION',
        userId: uid,
        timestamp: new Date().toISOString(),
        preservedFinancialRecords: true
      });

      // 2. Delete/Anonymize User Firestore Record
      await deleteDoc(doc(db, 'users', uid));

      // 3. Delete Auth Account
      await user.delete();

      // 4. Sign out cleanly
      await signOut(auth);
      setStep('COMPLETED');
    } catch (err: any) {
      console.error('Account deletion error:', err);
      if (err.code === 'auth/requires-recent-login') {
        setError('Security rule: Please sign out and sign in again before deleting your account.');
      } else {
        setError(err.message || 'An error occurred during account deletion.');
      }
      setStep('CONFIRM');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 text-red-400 mb-6">
          <Trash2 className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">Delete Account & Data</h1>
        </div>

        {step === 'AUTH' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-300">
              Account deletion requires authentication. Please sign in to verify your identity before proceeding with data deletion.
            </p>
            <a
              href="/admin"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/20"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Continue</span>
            </a>
          </div>
        )}

        {step === 'CONFIRM' && user && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-start space-x-3 text-amber-200 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-300">Permanent Action Warning</p>
                <p>
                  Deleting your account will permanently remove your profile, preferences, and private uploads. Financial records legally mandated for retention will be archived separately according to tax laws.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>Account Email: <strong className="text-white">{user.email}</strong></p>
              <p>User ID: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300">{user.uid}</code></p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300">
                Type <strong className="text-red-400 font-mono">DELETE</strong> below to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/30 p-3 rounded-lg border border-red-800/50">{error}</p>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || confirmText !== 'DELETE'}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-red-600/20"
              >
                {isDeleting ? 'Deleting Account...' : 'Confirm Account Deletion'}
              </button>
            </div>
          </div>
        )}

        {step === 'PROCESSING' && (
          <div className="text-center py-8 space-y-3">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-slate-300">Processing account data removal and anonymization...</p>
          </div>
        )}

        {step === 'COMPLETED' && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Account Deletion Complete</h2>
            <p className="text-xs text-slate-300">
              Your profile, personal data, and authenticated session have been deleted. You have been safely logged out.
            </p>
            <a
              href="/"
              className="inline-block px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
            >
              Return to Homepage
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
