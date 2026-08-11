"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { mockDB } from '../utils/mockDB';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  // Keep user stats refreshed
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const refreshedUser = mockDB.getCurrentUser();
      if (refreshedUser) {
        setUser(refreshedUser);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--color-primary)',
        fontFamily: 'var(--font-family-display)',
        fontSize: '1.25rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0, 242, 254, 0.1)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading Secure Space...
          <style jsx global>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'rgba(13, 27, 42, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid var(--border-card)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* User Card */}
        <div className="glass-card" style={{ padding: '15px 20px', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Welcome back,</p>
          <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.username}
          </h4>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Wallet Balance</p>
            <h3 style={{ color: 'var(--color-accent)', fontSize: '1.4rem' }}>
              ₹{user.balance.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/dashboard" className="sidebar-link" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            background: pathname === '/dashboard' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
            color: pathname === '/dashboard' ? 'var(--color-primary)' : 'var(--text-muted)',
            borderLeft: pathname === '/dashboard' ? '3px solid var(--color-primary)' : '3px solid transparent',
            transition: 'all 0.2s ease'
          }}>
            Earning Station
          </Link>

          <Link href="/tools" className="sidebar-link" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            background: pathname === '/tools' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
            color: pathname === '/tools' ? 'var(--color-primary)' : 'var(--text-muted)',
            borderLeft: pathname === '/tools' ? '3px solid var(--color-primary)' : '3px solid transparent',
            transition: 'all 0.2s ease'
          }}>
            Utility Tools
          </Link>

          <Link href="/withdraw" className="sidebar-link" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            background: pathname === '/withdraw' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
            color: pathname === '/withdraw' ? 'var(--color-primary)' : 'var(--text-muted)',
            borderLeft: pathname === '/withdraw' ? '3px solid var(--color-primary)' : '3px solid transparent',
            transition: 'all 0.2s ease'
          }}>
            Withdraw Rewards
          </Link>
        </nav>
        
        {/* Notice Info */}
        <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-dark)', lineHeight: '1.4' }}>
          <p>🔒 256-Bit SSL Encrypted Sessions</p>
          <p style={{ marginTop: '5px' }}>📈 Earn rate is based on advertiser auctions.</p>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
      
      <style jsx>{`
        .sidebar-link:hover {
          color: var(--color-primary) !important;
          background: rgba(0, 242, 254, 0.04) !important;
        }
      `}</style>
    </div>
  );
}
