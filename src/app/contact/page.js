"use client";

import { useState } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Save to Mock DB
    mockDB.saveContactMessage(formData.name, formData.email, formData.subject, formData.message);
    setSuccess('Thank you! Your message has been recorded. Our team will respond shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Get In Touch</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Contact Support</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
          Have questions or need withdrawal support? We are here to help.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {/* CONTACT FORM */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Send Us a Message</h2>

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
              <label className="input-label" htmlFor="name">Your Name</label>
              <input
                className="input-field"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                className="input-field"
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="subject">Subject</label>
              <input
                className="input-field"
                type="text"
                name="subject"
                id="subject"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="input-group" style={{ marginBottom: '25px' }}>
              <label className="input-label" htmlFor="message">Message</label>
              <textarea
                className="input-field"
                name="message"
                id="message"
                rows="5"
                placeholder="Describe your inquiry in detail..."
                value={formData.message}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', borderRadius: '10px' }}>
              Send Feedback Message
            </button>
          </form>
        </div>

        {/* SUPPORT DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Support Center</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              For queries related to transaction status, UPI verification, and data limits, contact our specialized helpdesk team:
            </p>
            <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
              Email:{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: 'var(--color-primary)' }}>
                {siteConfig.contactEmail}
              </a>
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', marginTop: '5px' }}>
              We target responses within 24 business hours.
            </p>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Operations Notice</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              VictorADS withdrawals are processed twice daily. UPI payouts settle within minutes of approval, and bank wire transactions can take up to 24 hours depending on network traffic and banking holidays.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slot="Contact_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
