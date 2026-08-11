"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Marketplace() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('browse'); // browse or sell
  const [sellForm, setSellForm] = useState({ amountMB: '1000', pricePerMB: '0.15' });
  const [msg, setMsg] = useState({ error: '', success: '' });

  const syncData = () => {
    const currentUser = mockDB.getCurrentUser();
    setUser(currentUser);
    setListings(mockDB.getDataListings());
  };

  useEffect(() => {
    syncData();
  }, []);

  const handleCreateListing = (e) => {
    e.preventDefault();
    const mb = parseFloat(sellForm.amountMB);
    const price = parseFloat(sellForm.pricePerMB);

    if (isNaN(mb) || mb <= 0 || isNaN(price) || price <= 0) {
      setMsg({ error: 'Please enter valid numbers for MB amount and price per MB.', success: '' });
      return;
    }

    const res = mockDB.listDataForSale(mb, price);
    if (res.success) {
      setMsg({ error: '', success: `Data package of ${mb}MB listed successfully on the marketplace!` });
      setSellForm({ amountMB: '1000', pricePerMB: '0.15' });
      syncData();
      setActiveTab('browse');
    } else {
      setMsg({ error: res.message, success: '' });
    }
  };

  const handleBuyPackage = (listingId) => {
    const res = mockDB.buyDataListing(listingId);
    if (res.success) {
      setMsg({ error: '', success: 'Data package purchased successfully! Funds transferred to seller (net of 10% platform survival fee).' });
      syncData();
    } else {
      setMsg({ error: res.message, success: '' });
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }} className="animate-fade-in-up">
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Internet Data Marketplace</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Buy and sell internet data bandwidth directly with other users worldwide
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('browse')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTab === 'browse' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTab === 'browse' ? '#030712' : 'var(--text-main)',
                border: activeTab === 'browse' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              🛒 Browse Data Listings
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTab === 'sell' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTab === 'sell' ? '#030712' : 'var(--text-main)',
                border: activeTab === 'sell' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              🏷️ List Data for Sale
            </button>
          </div>
        </div>

        {/* FEEDBACK MSGS */}
        {msg.error && (
          <div style={{ background: 'rgba(255, 71, 87, 0.1)', border: '1px solid rgba(255,71,87,0.2)', color: 'var(--color-danger)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
            ❌ {msg.error}
          </div>
        )}
        {msg.success && (
          <div style={{ background: 'rgba(0, 255, 135, 0.1)', border: '1px solid rgba(0,255,135,0.2)', color: 'var(--color-accent)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
            ✔️ {msg.success}
          </div>
        )}

        {/* BROWSE TAB */}
        {activeTab === 'browse' ? (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Active Internet Data Offers</h3>
              <span className="badge badge-finance">10% Platform Survival Fee Included</span>
            </div>

            {listings.filter(l => l.status === 'Active').length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '50px 20px',
                color: 'var(--text-dark)',
                border: '1px dashed rgba(255,255,255,0.06)',
                borderRadius: '12px'
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📡</p>
                <p>No active data listings currently online.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Be the first to list internet data for sale using the "List Data for Sale" button above!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {listings.filter(l => l.status === 'Active').map((listing) => (
                  <div key={listing.id} className="glass-card" style={{ padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-tech">Data Package</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seller: {listing.sellerName}</span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>{listing.amountMB} MB</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Rate: ₹{listing.pricePerMB} / MB</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)' }}>Total Package Cost</p>
                        <h4 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>₹{listing.totalPrice}</h4>
                      </div>

                      {user && user.id === listing.sellerId ? (
                        <button disabled className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px', opacity: 0.5 }}>
                          Your Listing
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyPackage(listing.id)}
                          className="btn btn-accent"
                          style={{ fontSize: '0.85rem', padding: '8px 18px', borderRadius: '6px' }}
                        >
                          Buy Package
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* SELL FORM TAB */
          <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>List Data Bandwidth for Sale</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Set your custom MB volume and price. When another user buys your offer, funds are credited directly to your balance minus a 10% platform survival fee.
            </p>

            <form onSubmit={handleCreateListing} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" htmlFor="amountMB">Data Volume (MB)</label>
                <input
                  className="input-field"
                  type="number"
                  name="amountMB"
                  id="amountMB"
                  placeholder="e.g. 1000"
                  value={sellForm.amountMB}
                  onChange={(e) => setSellForm({ ...sellForm, amountMB: e.target.value })}
                />
              </div>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" htmlFor="pricePerMB">Asking Price Per MB (₹)</label>
                <input
                  className="input-field"
                  type="number"
                  step="0.01"
                  name="pricePerMB"
                  id="pricePerMB"
                  placeholder="e.g. 0.15"
                  value={sellForm.pricePerMB}
                  onChange={(e) => setSellForm({ ...sellForm, pricePerMB: e.target.value })}
                />
              </div>

              {/* CALCULATION SUMMARY */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <p>Gross Package Price: <strong style={{ color: 'var(--text-main)' }}>₹{(parseFloat(sellForm.amountMB || 0) * parseFloat(sellForm.pricePerMB || 0)).toFixed(2)}</strong></p>
                <p style={{ marginTop: '4px' }}>Platform Survival Fee (10%): <strong style={{ color: 'var(--color-danger)' }}>-₹{(parseFloat(sellForm.amountMB || 0) * parseFloat(sellForm.pricePerMB || 0) * 0.10).toFixed(2)}</strong></p>
                <p style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  Your Net Earnings: <strong style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>₹{(parseFloat(sellForm.amountMB || 0) * parseFloat(sellForm.pricePerMB || 0) * 0.90).toFixed(2)}</strong>
                </p>
              </div>

              <button type="submit" className="btn btn-primary pulse-glow" style={{ borderRadius: '10px' }}>
                Publish Offer to Marketplace
              </button>
            </form>
          </div>
        )}

        <AdPlaceholder slot="Marketplace_Bottom_Ad" />
      </div>
    </DashboardLayout>
  );
}
