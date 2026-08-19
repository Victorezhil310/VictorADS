'use client';

import React, { useEffect, useState } from 'react';
import { ConsentManager } from '@/lib/consent/ConsentManager';

interface AdContainerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  isSubscriber?: boolean;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  slotId = '1234567890',
  format = 'auto',
  className = '',
  isSubscriber = false
}) => {
  const [canShowAds, setCanShowAds] = useState(false);

  useEffect(() => {
    // 1. If user is an active subscriber with Remove Ads entitlement, do not render ads
    if (isSubscriber) {
      setCanShowAds(false);
      return;
    }

    // 2. Respect Consent Manager preferences
    const consent = ConsentManager.getConsent();
    if (consent.state === 'DENIED' && !consent.personalizedAds) {
      // Non-personalized ads only or hidden based on policy
      setCanShowAds(true);
    } else {
      setCanShowAds(true);
    }
  }, [isSubscriber]);

  if (!canShowAds || isSubscriber) {
    return null;
  }

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-0000000000000000';

  return (
    <div className={`w-full my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-medium">
        Advertisement
      </div>
      <div className="min-h-[90px] flex items-center justify-center bg-slate-950/50 rounded-lg border border-dashed border-slate-800 text-xs text-slate-400">
        <span>Ad Placement Container ({publisherId} / Slot: {slotId})</span>
      </div>
      <p className="text-[10px] text-slate-600 mt-1">
        Commercial sponsor placement. Automated interaction or click manipulation is strictly prohibited.
      </p>
    </div>
  );
};
