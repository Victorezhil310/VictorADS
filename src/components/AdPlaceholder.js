"use client";

import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function AdPlaceholder({ slot, format = 'auto', style = {}, responsive = 'true' }) {
  const [isClient, setIsClient] = useState(false);
  const isDemo = !siteConfig.googleAdSensePublisherId || siteConfig.googleAdSensePublisherId.includes('pub-XXXXXXXXXXXXXXXX');

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Prevent console error noise if AdSense script is blocked or initializing
      }
    }
  }, [isDemo]);

  if (!isClient) return <div style={{ minHeight: '90px' }} />;

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
