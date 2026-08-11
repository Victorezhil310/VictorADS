"use client";

import { useEffect, useState } from 'react';
import UpiQrCode from '../../components/UpiQrCode';
import AdPlaceholder from '../../components/AdPlaceholder';
import { siteConfig } from '../../config/siteConfig';
import { mockDB } from '../../utils/mockDB';

export default function Subscriptions() {
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState('wallet'); // wallet or upi
  const [msg, setMsg] = useState({ error: '', success: '' });

  const syncUser = () => {
    setUser(mockDB.getCurrentUser());
  };

  useEffect(() => {
    syncUser();
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setMsg({ error: '', success: '' });
    setShowPayModal(true);
  };

  const handleWalletUpgrade = () => {
    if (!user) {
      setMsg({ error: 'Please log in to upgrade your subscription using wallet balance.', success: '' });
      return;
    }

    const res = mockDB.upgradeSubscription(selectedPlan.id, selectedPlan.name, selectedPlan.price);
    if (res.success) {
      setMsg({ error: '', success: `Success! You are now subscribed to ${selectedPlan.name}. Perks are now active!` });
      syncUser();
      setTimeout(() => setShowPayModal(false), 1800);
    } else {
      setMsg({ error: res.message, success: '' });
    }
  };

  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span className="badge badge-tech">⭐ VIP Membership & Data Pro</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Upgrade Your Earning Power</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px', maxWidth: '650px', margin: '6px auto 0' }}>
          Go 100% Ad-Free, unlock 2x reward multipliers on bandwidth selling, and enjoy priority UPI cashouts.
        </p>
      </div>

      {/* PLANS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '50px'
      }}>
        {siteConfig.subscriptionPlans.map((plan) => {
          const isCurrent = user && user.subscriptionPlan === plan.name;
          return (
            <div
              key={plan.id}
              className={`glass-card ${plan.id === 'data_pro' ? 'pulse-glow' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                border: plan.id === 'data_pro' ? '1px solid var(--color-primary)' : '1px solid var(--border-card)'
              }}
            >
              {plan.id === 'data_pro' && (
                <span className="badge badge-finance" style={{ position: 'absolute', top: '-12px', right: '20px' }}>
                  🔥 Most Popular
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.4rem' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '10px' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--color-accent)' }}>₹{plan.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {plan.period}</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--color-primary)' }}>✔</span> {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrent}
                className={`btn ${plan.id === 'data_pro' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', borderRadius: '10px' }}
              >
                {isCurrent ? 'Active Plan' : `Activate ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* PAYMENT MODAL */}
      {showPayModal && selectedPlan && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(3, 7, 18, 0.95)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '30px', position: 'relative' }}>
            <button
              onClick={() => setShowPayModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '5px' }}>
              Activate {selectedPlan.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Total Amount Due: <strong style={{ color: 'var(--color-accent)' }}>₹{selectedPlan.price}</strong>
            </p>

            {msg.error && (
              <div style={{ background: 'rgba(255,71,87,0.1)', color: 'var(--color-danger)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '15px' }}>
                ❌ {msg.error}
              </div>
            )}
            {msg.success && (
              <div style={{ background: 'rgba(0,255,135,0.1)', color: 'var(--color-accent)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '15px' }}>
                ✔️ {msg.success}
              </div>
            )}

            {/* PAYMENT MODE SELECTOR */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setPaymentMode('wallet')}
                className="btn"
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  background: paymentMode === 'wallet' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                  color: paymentMode === 'wallet' ? '#030712' : 'var(--text-main)',
                  border: 'none'
                }}
              >
                💼 Wallet Balance
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className="btn"
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  background: paymentMode === 'upi' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                  color: paymentMode === 'upi' ? '#030712' : 'var(--text-main)',
                  border: 'none'
                }}
              >
                ⚡ Instant UPI QR
              </button>
            </div>

            {paymentMode === 'wallet' ? (
              <div style={{ textAlign: 'center', padding: '15px 0' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  Current Wallet Balance: <strong>₹{user ? user.balance.toFixed(2) : '0.00'}</strong>
                </p>
                <button
                  onClick={handleWalletUpgrade}
                  className="btn btn-accent"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  Pay ₹{selectedPlan.price} from Wallet
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <UpiQrCode amount={selectedPlan.price} note={`Subscription: ${selectedPlan.name}`} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                  Scan and pay via GPay/PhonePe. Account activates automatically upon verification.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <AdPlaceholder slot="Subscriptions_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
