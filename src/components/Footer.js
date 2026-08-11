"use client";

import Link from 'next/link';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content animate-fade-in-up">
        <div className="footer-column">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
            <span style={{ color: 'var(--color-primary)' }}>Victor</span>ADS
          </h3>
          <p style={{ marginTop: '12px', fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Empowering users to monetize their idle digital resources. Watch ads, buy & sell bandwidth, and learn the mechanics of the internet sharing economy through secure, legal methods.
          </p>
        </div>

        <div className="footer-column">
          <h3>Earning & Trade</h3>
          <ul>
            <li><Link href="/dashboard">Earning Station</Link></li>
            <li><Link href="/marketplace">Data Marketplace</Link></li>
            <li><Link href="/subscriptions">VIP & Ad-Free Plans</Link></li>
            <li><Link href="/withdraw">UPI Cash Withdrawals</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Information & Support</h3>
          <ul>
            <li><Link href="/articles">SEO Knowledge Base</Link></li>
            <li><Link href="/donate">Support Platform (Donate)</Link></li>
            <li><Link href="/about">About VictorADS</Link></li>
            <li><Link href="/contact">Support & Contact</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Legal & Compliance</h3>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ fontSize: '0.8rem' }}>
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
        <p style={{ fontSize: '0.8rem', display: 'flex', gap: '20px' }}>
          <span>Contact: <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: 'var(--color-primary)' }}>{siteConfig.contactEmail}</a></span>
          <span>Version: 2.0.0 (AdSense & Marketplace Ready)</span>
        </p>
      </div>
    </footer>
  );
}
