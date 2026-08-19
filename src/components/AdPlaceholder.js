"use client";

import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { mockDB } from '../utils/mockDB';

export default function AdPlaceholder({ slot, format = 'auto', style = {}, responsive = 'true' }) {
  const [isClient, setIsClient] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const isDemo = !siteConfig.googleAdSensePublisherId || siteConfig.googleAdSensePublisherId.includes('pub-XXXXXXXXXXXXXXXX');

  useEffect(() => {
    setIsClient(true);
    const currentUser = mockDB.getCurrentUser();
    if (currentUser && currentUser.subscriptionPlan && currentUser.subscriptionPlan !== 'Free Tier') {
      setIsVip(true);
    } else {
      setIsVip(false);
      if (typeof window !== 'undefined') {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          // Prevent console error noise if AdSense script is blocked or initializing
        }
      }
    }
  }, [isDemo]);

  if (!isClient) return <div style={{ minHeight: '90px' }} />;

  // 100% Ad-Free experience for VIP / Subscription members
  if (isVip) {
    return (
      <div style={{
        padding: '12px 18px',
        margin: '15px auto',
        maxWidth: '728px',
        background: 'rgba(0, 255, 135, 0.05)',
        border: '1px solid rgba(0, 255, 135, 0.2)',
        borderRadius: '10px',
        textAlign: 'center',
        color: 'var(--color-accent)',
        fontSize: '0.8rem',
        fontWeight: '600'
      }}>
        ⭐ 100% Ad-Free VIP Pass Active ({mockDB.getCurrentUser()?.subscriptionPlan}) — Ads Hidden
      </div>
    );
  }

  return (
    <div className="ad-unit animate-fade-in-up" style={{ width: '100%', overflow: 'hidden', margin: '20px auto', maxWidth: '728px', ...style }}>
      <span className="ad-label">Sponsored Advertisement (Google AdSense Verified)</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px', borderRadius: '8px', ...style }}
        data-ad-client={siteConfig.googleAdSensePublisherId}
        data-ad-slot={slot || '1234567890'}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
