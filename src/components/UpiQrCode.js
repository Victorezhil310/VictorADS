"use client";

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { siteConfig } from '../config/siteConfig';

export default function UpiQrCode({ amount = 100, note = 'VictorADS Platform Support', showAmountInQr = true }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [showRawUpi, setShowRawUpi] = useState(false);
  const [loading, setLoading] = useState(true);

  const targetUpi = siteConfig.donationUpiId; // arasu9629hf@gmail.com
  const targetName = siteConfig.donationUpiName;

  useEffect(() => {
    async function generateQr() {
      setLoading(true);
      try {
        // Standard NPCI UPI Intent URI format
        let upiUri = `upi://pay?pa=${encodeURIComponent(targetUpi)}&pn=${encodeURIComponent(targetName)}&tn=${encodeURIComponent(note)}&cu=INR`;
        if (showAmountInQr && amount > 0) {
          upiUri += `&am=${amount}`;
        }

        const dataUrl = await QRCode.toDataURL(upiUri, {
          width: 280,
          margin: 2,
          color: {
            dark: '#040814', // High contrast dark
            light: '#ffffff' // White background for scanner readability
          }
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate UPI QR code:', err);
      } finally {
        setLoading(false);
      }
    }

    generateQr();
  }, [amount, note, targetUpi, targetName, showAmountInQr]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--border-card)',
      borderRadius: '16px',
      textAlign: 'center',
      width: '100%',
      maxWidth: '340px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="badge badge-tech">⚡ UPI Fast Payment</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>Instant Verify</span>
      </div>

      {/* QR CODE CONTAINER */}
      <div style={{
        background: '#ffffff',
        padding: '12px',
        borderRadius: '14px',
        boxShadow: '0 10px 35px rgba(0,0,0,0.6)',
        position: 'relative'
      }}>
        {loading ? (
          <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
            Generating QR Code...
          </div>
        ) : (
          <img
            src={qrDataUrl}
            alt="UPI QR Code"
            style={{ width: '220px', height: '220px', display: 'block', borderRadius: '8px' }}
          />
        )}
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
        Scan with GPay, PhonePe, Paytm, BHIM
      </p>

      {amount > 0 && (
        <p style={{ fontSize: '1.25rem', color: 'var(--color-accent)', fontWeight: '800' }}>
          Amount: ₹{amount}
        </p>
      )}

      {/* UPI ID HIDDEN BY DEFAULT (ONLY SHOWN IF USER TOGGLES) */}
      <div style={{ width: '100%', marginTop: '5px' }}>
        {showRawUpi ? (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            color: 'var(--color-primary)',
            wordBreak: 'break-all'
          }}>
            {targetUpi}
            <button
              onClick={() => {
                navigator.clipboard.writeText(targetUpi);
                alert('UPI ID copied to clipboard!');
              }}
              style={{
                marginLeft: '8px',
                padding: '3px 8px',
                fontSize: '0.75rem',
                borderRadius: '4px',
                background: 'rgba(0, 242, 254, 0.2)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Copy
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowRawUpi(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Show raw UPI ID text
          </button>
        )}
      </div>
    </div>
  );
}
