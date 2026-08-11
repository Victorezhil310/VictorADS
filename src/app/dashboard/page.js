"use client";

import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('watch'); // watch or share
  
  // Watch Ads states
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(15);
  const [isAdComplete, setIsAdComplete] = useState(false);
  const [adEarningsCredited, setAdEarningsCredited] = useState(false);
  const [currentAdCreative, setCurrentAdCreative] = useState(0);

  // Bandwidth sharing states
  const [isSharing, setIsSharing] = useState(false);
  const [sharedMB, setSharedMB] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const shareIntervalRef = useRef(null);

  // Simulated ad campaigns
  const adCampaigns = [
    { title: "QuantumCloud Solutions", subtitle: "Decentralized Database Hosting", desc: "Get high-performance, low-latency, and distributed databases for your Next.js and React applications. Sign up today and get $200 free cloud credits!" },
    { title: "SafePath VPN Protocol", subtitle: "Next-Gen Cryptographic Shields", desc: "Defend your connection with military-grade privacy. Bypasses geo-restrictions, features zero logs policy, and speeds up residential proxy connections." },
    { title: "FinFlow Mobile Wallet", subtitle: "Instant UPI Settlement System", desc: "Send, receive, and earn cashbacks directly to your bank account with zero fees. Safe, reliable, and trusted by millions of merchants." }
  ];

  // Refresh user data from mockDB
  const syncUser = () => {
    const u = mockDB.getCurrentUser();
    setUser(u);
    if (u) {
      setSharedMB(parseFloat((u.dataSharedMB).toFixed(1)));
    }
  };

  useEffect(() => {
    syncUser();
    return () => {
      if (shareIntervalRef.current) clearInterval(shareIntervalRef.current);
    };
  }, []);

  // Ad player counter
  useEffect(() => {
    let interval;
    if (showAdModal && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1);
      }, 1000);
    } else if (adTimer === 0) {
      setIsAdComplete(true);
    }
    return () => clearInterval(interval);
  }, [showAdModal, adTimer]);

  const handleStartAd = () => {
    // Select a random ad campaign creative
    setCurrentAdCreative(Math.floor(Math.random() * adCampaigns.length));
    setAdTimer(15);
    setIsAdComplete(false);
    setAdEarningsCredited(false);
    setShowAdModal(true);
  };

  const handleClaimAdEarnings = () => {
    if (!isAdComplete || adEarningsCredited) return;
    
    // Credit ₹2.50 to wallet
    const updated = mockDB.creditUser(siteConfig.adRewardAmount, 'ad', `Watched Ad: ${adCampaigns[currentAdCreative].title}`);
    setUser(updated);
    setAdEarningsCredited(true);
    setTimeout(() => {
      setShowAdModal(false);
    }, 800);
  };

  // Toggle Bandwidth Sharing
  const handleToggleSharing = () => {
    if (isSharing) {
      // Turn off
      if (shareIntervalRef.current) {
        clearInterval(shareIntervalRef.current);
        shareIntervalRef.current = null;
      }
      setIsSharing(false);
      setUploadSpeed(0);
      setDownloadSpeed(0);
    } else {
      // Turn on
      setIsSharing(true);
      
      // Simulate connection stats
      setUploadSpeed(parseFloat((Math.random() * 15 + 5).toFixed(1)));
      setDownloadSpeed(parseFloat((Math.random() * 40 + 20).toFixed(1)));

      shareIntervalRef.current = setInterval(() => {
        // Fluctuating speeds
        setUploadSpeed(parseFloat((Math.random() * 8 + 8).toFixed(1)));
        setDownloadSpeed(parseFloat((Math.random() * 20 + 30).toFixed(1)));

        // Increment data shared (0.5MB every tick)
        const incrementalMB = 0.5;
        
        // Calculate proportional credit: ₹0.10 per MB -> ₹0.05 per 0.5MB
        const reward = incrementalMB * siteConfig.dataRewardPerMB;
        
        const updated = mockDB.creditUser(reward, 'data', `Shared ${incrementalMB}MB bandwidth`);
        setUser(updated);
        setSharedMB(prev => parseFloat((prev + incrementalMB).toFixed(1)));
      }, 3000);
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }} className="animate-fade-in-up">
        {/* TOP META ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Earning Station</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Monetize your attention and network bandwidth in real time
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('watch')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                background: activeTab === 'watch' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTab === 'watch' ? '#030712' : 'var(--text-main)',
                border: activeTab === 'watch' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              📺 Watch Video Ads
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                background: activeTab === 'share' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTab === 'share' ? '#030712' : 'var(--text-main)',
                border: activeTab === 'share' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              ⚡ Share Bandwidth
            </button>
          </div>
        </div>

        {/* OVERVIEW STATS ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wallet Balance</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)', marginTop: '5px' }}>
              ₹{user.balance.toFixed(2)}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '5px' }}>
              Min. withdraw threshold: ₹{siteConfig.minWithdrawal}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Ads Watched</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginTop: '5px' }}>
              {user.adsWatched}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '5px' }}>
              Reward: ₹{siteConfig.adRewardAmount.toFixed(2)} per ad
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bandwidth Shared</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-purple)', marginTop: '5px' }}>
              {sharedMB} MB
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '5px' }}>
              Rate: ₹{siteConfig.dataRewardPerMB.toFixed(2)} per MB
            </p>
          </div>
        </div>

        {/* INTERACTIVE MONETIZATION PANEL */}
        {activeTab === 'watch' ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '50px 30px' }}>
            <span style={{ fontSize: '3rem' }}>📺</span>
            <h2 style={{ fontSize: '1.75rem', marginTop: '15px' }}>Watch Ads and Earn Cash</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '10px auto 30px', maxWidth: '500px' }}>
              Click the play button below to launch a sponsor ad. Watch it completely for 15 seconds to receive ₹{siteConfig.adRewardAmount.toFixed(2)} instantly in your wallet.
            </p>
            <button onClick={handleStartAd} className="btn btn-primary pulse-glow" style={{ padding: '14px 40px', borderRadius: '30px' }}>
              Play Sponsor Ad (+₹2.50)
            </button>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '40px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Sell Idle Internet Bandwidth</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Enable proxy routing to receive micro-credits while you browse, sleep, or study.
                </p>
              </div>
              <div>
                <button
                  onClick={handleToggleSharing}
                  className={`btn ${isSharing ? 'btn-secondary' : 'btn-accent'}`}
                  style={{
                    padding: '12px 30px',
                    borderColor: isSharing ? 'var(--color-danger)' : 'initial',
                    color: isSharing ? 'var(--color-danger)' : 'initial'
                  }}
                >
                  {isSharing ? '🔴 Stop Data Sharing' : '🟢 Activate Data Sharing'}
                </button>
              </div>
            </div>

            {/* SPEEDOMETER ROW */}
            {isSharing ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                background: 'rgba(255,255,255,0.02)',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid rgba(0,255,135,0.1)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</p>
                  <p style={{ fontSize: '1.25rem', color: 'var(--color-accent)', fontWeight: 'bold', marginTop: '5px', animation: 'pulse 1.5s infinite' }}>
                    🟢 Sharing Data...
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Download Speed</p>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '5px' }}>
                    {downloadSpeed} Mbps
                  </h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload Speed</p>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '5px' }}>
                    {uploadSpeed} Mbps
                  </h3>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px dashed rgba(255,255,255,0.06)',
                borderRadius: '12px',
                color: 'var(--text-dark)'
              }}>
                <p>Status: Offline. Toggle sharing above to start generating income from data sharing.</p>
              </div>
            )}
          </div>
        )}

        {/* STATIC ADS UNIT COMPLIANCE */}
        <AdPlaceholder slot="Dashboard_Center_Banner" />

        {/* VIDEO AD MODAL */}
        {showAdModal && (
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
            <div className="glass-card" style={{
              width: '100%',
              maxWidth: '560px',
              padding: '35px',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="badge badge-tech">📺 Sponsor Advertisement</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  {isAdComplete ? (
                    <span style={{ color: 'var(--color-accent)' }}>✅ Completed!</span>
                  ) : (
                    <span>Time Remaining: <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>{adTimer}s</strong></span>
                  )}
                </span>
              </div>

              {/* simulated player screen */}
              <div style={{
                background: 'radial-gradient(circle at center, #0f1c30 0%, #050b14 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '30px 20px',
                textAlign: 'center',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px'
              }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                  {adCampaigns[currentAdCreative].title}
                </h3>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-purple)' }}>
                  {adCampaigns[currentAdCreative].subtitle}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '400px' }}>
                  {adCampaigns[currentAdCreative].desc}
                </p>
              </div>

              {/* claim section */}
              <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                {isAdComplete ? (
                  <button
                    onClick={handleClaimAdEarnings}
                    disabled={adEarningsCredited}
                    className="btn btn-accent pulse-glow"
                    style={{ width: '100%', borderRadius: '8px' }}
                  >
                    {adEarningsCredited ? 'Credited successfully!' : 'Collect Reward (+₹2.50)'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-secondary"
                    style={{ width: '100%', borderRadius: '8px', cursor: 'not-allowed', opacity: '0.5' }}
                  >
                    Please wait {adTimer} seconds...
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </DashboardLayout>
  );
}
