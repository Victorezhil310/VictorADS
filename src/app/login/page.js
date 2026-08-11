"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockDB } from '../../utils/mockDB';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // If already logged in, skip login page
    if (mockDB.getCurrentUser()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    const response = mockDB.login(formData.emailOrUsername, formData.password);

    if (response.success) {
      setSuccess('Authenticated! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      setError(response.message);
    }
  };

  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at center, rgba(13, 27, 42, 0.4) 0%, rgba(3, 7, 18, 0.95) 100%)'
    }}>
      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Secure Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
            Access your earning dashboard and digital tools
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 71, 87, 0.1)',
            border: '1px solid rgba(255, 71, 87, 0.2)',
            color: 'var(--color-danger)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0, 255, 135, 0.1)',
            border: '1px solid rgba(0, 255, 135, 0.2)',
            color: 'var(--color-accent)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ✔️ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="emailOrUsername">Email or Username</label>
            <input
              className="input-field"
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              placeholder="Enter your email or username"
              value={formData.emailOrUsername}
              onChange={handleChange}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '30px' }}>
            <label className="input-label" htmlFor="password">Password</label>
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: '100%', borderRadius: '12px' }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
