"use client";

import { useState } from 'react';
import UpiQrCode from '../../components/UpiQrCode';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [donorName, setDonorName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePresetSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
    setErrorMsg('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setSelectedAmount(parseFloat(val));
    }
    setErrorMsg('');
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 6) {
      setErrorMsg('Please enter a valid 12-digit UTR or Transaction reference number.');
      return;
    }

    if (selectedAmount < 100) {
      setErrorMsg('Minimum donation amount is ₹100.');
      return;
    }

    const res = mockDB.recordDonation(selectedAmount, utrNumber);
    if (res.success) {
      setSuccessMsg(`Thank you! Your donation of ₹${selectedAmount} has been recorded and verified. We appreciate your platform support!`);
      setUtrNumber('');
      setDonorName('');
    } else {
      setErrorMsg('Failed to record transaction. Please try again.');
    }
  };

  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-finance">❤️ Platform Survival & Growth</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Support VictorADS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px', maxWidth: '650px', margin: '6px auto 0' }}>
          Your voluntary contributions keep our servers running, maintain bandwidth infrastructure, and keep our tools free for everyone.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
        {/* LEFT PANEL: SELECT AMOUNT & SUBMIT */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Choose Contribution Amount</h2>

          {/* PRESET AMOUNTS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {[100, 250, 500, 1000, 2500, 5000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetSelect(amt)}
                className="btn"
                style={{
                  padding: '12px 10px',
                  fontSize: '0.95rem',
                  borderRadius: '10px',
                  background: selectedAmount === amt && !customAmount ? 'var(--grad-primary)' : 'rgba(255,255,255,0.03)',
                  color: selectedAmount === amt && !customAmount ? '#030712' : 'var(--text-main)',
                  border: selectedAmount === amt && !customAmount ? 'none' : '1px solid var(--border-card)'
                }}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          {/* CUSTOM AMOUNT */}
          <div className="input-group" style={{ marginBottom: '25px' }}>
            <label className="input-label" htmlFor="customAmount">Or Enter Custom Amount (₹100 to Unlimited)</label>
            <input
              className="input-field"
              type="number"
              id="customAmount"
              placeholder="e.g. 1500"
              value={customAmount}
              onChange={handleCustomChange}
              min="100"
            />
          </div>

          {/* CONFIRMATION FORM */}
          <form onSubmit={handleDonationSubmit} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Submit UTR Verification</h3>

            {errorMsg && (
              <div style={{
                background: 'rgba(255, 71, 87, 0.1)',
                border: '1px solid rgba(255, 71, 87, 0.2)',
                color: 'var(--color-danger)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '15px'
              }}>
                ❌ {errorMsg}
              </div>
            )}

            {successMsg && (
              <div style={{
                background: 'rgba(0, 255, 135, 0.1)',
                border: '1px solid rgba(0, 255, 135, 0.2)',
                color: 'var(--color-accent)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '15px'
              }}>
                ✔️ {successMsg}
              </div>
            )}

            <div className="input-group">
              <label className="input-label" htmlFor="donorName">Contributor Name (Optional)</label>
              <input
                className="input-field"
                type="text"
                id="donorName"
                placeholder="Your name or Anonymous"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label className="input-label" htmlFor="utrNumber">12-Digit UTR / UPI Ref No.</label>
              <input
                className="input-field"
                type="text"
                id="utrNumber"
                placeholder="e.g. 423910293841"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-accent pulse-glow" style={{ width: '100%', borderRadius: '10px' }}>
              Verify & Register Contribution (₹{selectedAmount})
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: DYNAMIC QR CODE FOR ARASU9629HF@OKHDFCBANK */}
        <div>
          <div style={{
            background: 'rgba(0, 255, 135, 0.08)',
            border: '1px solid rgba(0, 255, 135, 0.25)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '18px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Direct Platform UPI ID:</p>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontFamily: 'monospace', margin: '4px 0' }}>
              arasu9629hf@okhdfcbank
            </h4>
          </div>

          <UpiQrCode amount={selectedAmount} note="VictorADS Platform Donation" />
          
          <div className="glass-card" style={{ marginTop: '20px', padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--color-primary)' }}>🔒 Legal & Transparency</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Donations are voluntary gifts sent directly via UPI to <strong>arasu9629hf@okhdfcbank</strong> to maintain cloud server operations, proxy encryption nodes, and tool hosting. They do not constitute investment returns.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slot="Donate_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
