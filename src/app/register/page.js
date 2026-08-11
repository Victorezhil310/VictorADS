"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockDB } from '../../utils/mockDB';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
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
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Mock DB registration
    const response = mockDB.register(formData.username, formData.email, formData.password);

    if (response.success) {
      setSuccess('Account created! Crediting ₹100.00 starter bonus...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setError(response.message);
    }
  };

  return (
    <main style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at center, rgba(13, 27, 42, 0.4) 0%, rgba(3, 7, 18, 0.95) 100%)'
    }}>
      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '40px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
            Join VictorADS and build active micro-savings streams
          </p>
        </div>

        {/* Bonus Badge */}
        <div className="pulse-glow" style={{
          background: 'linear-gradient(90deg, rgba(0, 255, 135, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)',
          border: '1px solid rgba(0, 255, 135, 0.3)',
          borderRadius: '10px',
          padding: '10px 15px',
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: 'var(--color-accent)',
          marginBottom: '20px'
        }}>
          🎁 Instant Sign-up Reward: Free ₹100.00 inside!
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
            <label className="input-label" htmlFor="username">Username</label>
            <input
              className="input-field"
              type="text"
              id="username"
              name="username"
              placeholder="Pick a unique username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              placeholder="e.g. name@example.com"
              value={formData.email}
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
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: '100%', borderRadius: '12px' }}>
            Sign Up & Claim Bonus
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
