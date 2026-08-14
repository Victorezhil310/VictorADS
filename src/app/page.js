"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThreeDCanvas from '../components/ThreeDCanvas';
import AdPlaceholder from '../components/AdPlaceholder';
import { articles } from '../utils/contentLibrary';
import { mockDB } from '../utils/mockDB';

export default function Home() {
  const [user, setUser] = useState(null);
  const recentArticles = articles.slice(0, 3); // Get first 3 articles for showcase

  useEffect(() => {
    setUser(mockDB.getCurrentUser());
  }, []);

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      {/* HERO SECTION WITH 3D CANVAS */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        background: 'radial-gradient(ellipse at center, rgba(11, 19, 43, 0.6) 0%, rgba(3, 7, 18, 0.9) 100%)',
        borderBottom: '1px solid var(--border-card)'
      }}>
        {/* 3D Interactive Canvas */}
        <ThreeDCanvas />

        <div className="section-container animate-fade-in-up" style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <span className="badge badge-tech">🚀 Watch Ads, Earn Coins & Redeem Rewards</span>
          
          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: '1.15',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 30%, #00f2fe 70%, #4facfe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>
            Watch Ads, Earn Coins & Redeem Play Store, Amazon & Flipkart Vouchers
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            maxWidth: '650px'
          }}>
            VictorADS lets you watch sponsor ads and monetize idle bandwidth. Earn coins and redeem them instantly for <strong>Google Play Redeem Codes</strong>, <strong>Amazon Pay Vouchers</strong>, <strong>Flipkart Gift Cards</strong>, or <strong>Direct UPI Cash</strong> (`arasu9629hf@okhdfcbank`).
          </p>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-primary">
                  📺 Watch Ads & Earn Coins
                </Link>
                <Link href="/withdraw" className="btn btn-accent pulse-glow">
                  🎁 Redeem Gift Cards & Cash
                </Link>
              </>
            ) : (
              <>
                <Link href="/register" className="btn btn-primary">
                  Start Watching Ads & Earning Coins
                </Link>
                <Link href="/withdraw" className="btn btn-secondary">
                  View Gift Cards Store
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* AD BLOCK (AdSense compliant placement) */}
      <div className="section-container" style={{ padding: '20px 24px 0' }}>
        <AdPlaceholder slot="Home_Hero_Bottom" />
      </div>

      {/* PLATFORM STATS */}
      <section className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          textAlign: 'center'
        }}>
          <div className="glass-card">
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>₹4,82,910+</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>Total Payouts Distributed</p>
          </div>
          <div className="glass-card">
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}>12,890 GB</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>Bandwidth Shared Securely</p>
          </div>
          <div className="glass-card">
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-purple)' }}>45,200+</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>Registered Earners</p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section style={{ background: 'rgba(255, 255, 255, 0.01)', borderY: '1px solid var(--border-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-finance">How It Works</span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '12px' }}>Simple Channels to Accumulate Capital</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Get rewarded for sharing digital commodities</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Feature 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>📺</div>
              <h3>Watch Video Ads</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Watch verified, family-friendly advertising units. Earn ₹2.50 for each completed watch sequence. Payouts are sponsored by premium global brands.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(0, 255, 135, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>⚡</div>
              <h3>Share Bandwidth</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Toggle data connection sharing to rent out your idle internet bandwidth. Safely encrypted proxies carry out background audits. Earn ₹0.10 per shared MB.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(240, 147, 251, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-purple)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>🛠️</div>
              <h3>Useful Modern Tools</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Access integrated browser utilities for daily work: Image-to-PDF compiler, URL-to-QR code generator, and Link analyzers. Fully client-side and free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ARTICLES (Crucial for search engines crawling content) */}
      <section className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="badge badge-security">Educational Library</span>
            <h2 style={{ fontSize: '2rem', marginTop: '12px' }}>Latest Digital Insights</h2>
          </div>
          <Link href="/articles" style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
            View All Articles &rarr;
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {recentArticles.map((art) => (
            <article key={art.slug} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <span className={`badge ${art.category === 'Technology' ? 'badge-tech' : art.category === 'Finance' ? 'badge-finance' : 'badge-security'}`} style={{ alignSelf: 'flex-start' }}>
                {art.category}
              </span>
              <h3 style={{ fontSize: '1.25rem' }}>
                <Link href={`/articles/${art.slug}`} style={{ hover: { color: 'var(--color-primary)' } }}>
                  {art.title}
                </Link>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {art.summary}
              </p>
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dark)',
                paddingTop: '15px',
                borderTop: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span>{art.date}</span>
                <span>{art.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AD BLOCK (AdSense compliant placement) */}
      <div className="section-container" style={{ padding: '0 24px 40px' }}>
        <AdPlaceholder slot="Home_Footer_Top" />
      </div>
      
      <style jsx>{`
        h3 Link:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </main>
  );
}
