"use client";

import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function AdPlaceholder({ slot, format = 'auto', style = {}, responsive = 'true' }) {
  const [isClient, setIsClient] = useState(false);
  const isDemo = !siteConfig.googleAdSensePublisherId || siteConfig.googleAdSensePublisherId.includes('pub-XXXXXXXXXXXXXXXX');

  useEffect(() => {
    setIsClient(true);
    // Trigger Google AdSense script loading if configured
    if (!isDemo && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense script pushing error:', err);
      }
    }
  }, [isDemo]);

  if (!isClient) return <div style={{ minHeight: '90px' }} />;

  if (isDemo) {
    // Elegant fallback mock banner
    return (
      <div className="ad-unit animate-fade-in-up" style={{ width: '100%', maxWidth: '728px', ...style }}>
        <span className="ad-label">Advertisement (AdSense Code Integrated)</span>
        <div style={{
          padding: '15px',
          background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '6px',
          width: '100%'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Google AdSense Ad Slot: <strong style={{ color: 'var(--color-primary)' }}>{slot || 'General_Banner'}</strong>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>
            This ad unit is fully prepared. It will display live ads once the AdSense review completes.
          </p>
        </div>
      </div>
    );
  }

  // Real Google AdSense component
  return (
    <div className="ad-unit" style={{ width: '100%', overflow: 'hidden', ...style }}>
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={siteConfig.googleAdSensePublisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
