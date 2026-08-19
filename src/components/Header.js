"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { mockDB } from '../utils/mockDB';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = mockDB.getCurrentUser();
      setUser(currentUser);
    };

    checkUser();
    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    mockDB.logout();
    setUser(null);
    router.push('/');
  };

  return (
    <header className="main-header">
      <Link href="/" className="header-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 5px var(--color-primary))' }}>
          <path d="M12 2L2 22h20L12 2z" fill="url(#logo-grad)" />
          <defs>
            <linearGradient id="logo-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
          </defs>
        </svg>
        VictorADS
      </Link>

      <nav className="header-nav">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/withdraw" className={`nav-link ${pathname === '/withdraw' ? 'active' : ''}`}>
          🎁 Rewards & Redeem
        </Link>
        <Link href="/articles" className={`nav-link ${pathname.startsWith('/articles') ? 'active' : ''}`}>
          Articles
        </Link>
        <Link href="/subscriptions" className={`nav-link ${pathname === '/subscriptions' ? 'active' : ''}`}>
          VIP Plans
        </Link>
        <Link href="/donate" className={`nav-link ${pathname === '/donate' ? 'active' : ''}`}>
          ❤️ Donate
        </Link>
        <Link href="/publisher" className={`nav-link ${pathname === '/publisher' ? 'active' : ''}`}>
          🌐 AdCash Publisher
        </Link>
        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
          About
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Get Started
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
