"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Withdraw() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('vouchers'); // 'vouchers' or 'cash'
  const [method, setMethod] = useState('upi'); // upi or bank
  
  // Voucher redemption states
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [redemptionSuccess, setRedemptionSuccess] = useState('');
  const [redemptionError, setRedemptionError] = useState('');

  // Cashout form states
  const [formData, setFormData] = useState({
    amount: '',
    upiId: '',
    accountHolderName: '',
    accountNo: '',
    ifscCode: '',
    bankName: ''
  });
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const syncData = () => {
    const currentUser = mockDB.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setTransactions(mockDB.getTransactions());
      setVouchers(mockDB.getVouchers());
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCashoutSubmit = (e) => {
    e.preventDefault();
    const withdrawAmt = parseFloat(formData.amount);

    if (isNaN(withdrawAmt) || withdrawAmt <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (withdrawAmt < siteConfig.minWithdrawal) {
      setError(`Minimum withdrawal amount is ₹${siteConfig.minWithdrawal}.`);
      return;
    }

    if (withdrawAmt > user.balance) {
      setError('Insufficient balance.');
      return;
    }

    let details = {};
    if (method === 'upi') {
      if (!formData.upiId) {
        setError('Please enter your UPI ID.');
        return;
      }
      if (!formData.upiId.includes('@')) {
        setError('Please enter a valid UPI VPA ID (e.g. name@upi).');
        return;
      }
      details = { upiId: formData.upiId };
    } else {
      if (!formData.accountHolderName || !formData.accountNo || !formData.ifscCode) {
        setError('Please enter all bank account details.');
        return;
      }
      details = {
        accountHolderName: formData.accountHolderName,
        accountNo: formData.accountNo,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName || 'Bank'
      };
    }

    const response = mockDB.requestWithdrawal(withdrawAmt, method, details);

    if (response.success) {
      setSuccess(`Cashout request of ₹${withdrawAmt} submitted successfully!`);
      setFormData({
        amount: '',
        upiId: '',
        accountHolderName: '',
        accountNo: '',
        ifscCode: '',
        bankName: ''
      });
      syncData();
    } else {
      setError(response.message);
    }
  };

  const handleRedeemVoucher = (voucherType, rupeeAmount, coinCost) => {
    setRedemptionError('');
    setRedemptionSuccess('');

    const res = mockDB.redeemVoucher(voucherType, rupeeAmount, coinCost);
    if (res.success) {
      setRedemptionSuccess(`Congratulations! Successfully redeemed ${res.voucher.title} (₹${rupeeAmount}). Code: ${res.voucher.code}`);
      syncData();
    } else {
      setRedemptionError(res.message);
    }
  };

  if (!user) return null;

  const userCoins = user.coins || Math.round(user.balance * 100);

  const voucherOptions = [
    {
      type: 'playstore',
      title: 'Google Play Store Redeem Code',
      icon: '🎮',
      badge: 'Popular for Gaming & Apps',
      color: '#00F2FE',
      tiers: [
        { rupee: 100, coins: 10000 },
        { rupee: 250, coins: 25000 },
        { rupee: 500, coins: 50000 },
        { rupee: 1000, coins: 100000 },
      ]
    },
    {
      type: 'amazon',
      title: 'Amazon Pay Gift Card',
      icon: '🛒',
      badge: 'Shopping & Bills',
      color: '#FF9900',
      tiers: [
        { rupee: 100, coins: 10000 },
        { rupee: 250, coins: 25000 },
        { rupee: 500, coins: 50000 },
        { rupee: 1000, coins: 100000 },
      ]
    },
    {
      type: 'flipkart',
      title: 'Flipkart Gift Voucher',
      icon: '🛍️',
      badge: 'Ecommerce Shopping',
      color: '#2874F0',
      tiers: [
        { rupee: 100, coins: 10000 },
        { rupee: 250, coins: 25000 },
        { rupee: 500, coins: 50000 },
        { rupee: 1000, coins: 100000 },
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in-up">
        {/* HEADER STATS BANNER */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: 'linear-gradient(135deg, rgba(0,242,254,0.08) 0%, rgba(112,0,255,0.08) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          borderRadius: '16px',
          padding: '25px 30px'
        }}>
          <div>
            <span className="badge badge-finance">🪙 VictorADS Coins Store</span>
            <h1 style={{ fontSize: '2.2rem', marginTop: '6px', fontWeight: '800' }}>Coins & Voucher Exchange</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Convert your earned coins to Play Store Codes, Amazon/Flipkart Vouchers, or Direct UPI Cash.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Available Balance</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)', fontWeight: '800' }}>
                🪙 {userCoins.toLocaleString()} <span style={{ fontSize: '1rem', color: '#fff' }}>Coins</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                ₹{user.balance.toFixed(2)} INR
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => setActiveTab('vouchers')}
            className="btn"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              borderRadius: '10px',
              background: activeTab === 'vouchers' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
              color: activeTab === 'vouchers' ? '#030712' : 'var(--text-main)',
              border: activeTab === 'vouchers' ? 'none' : '1px solid var(--border-card)',
              fontWeight: 'bold'
            }}
          >
            🎁 Redeem Gift Vouchers
          </button>

          <button
            onClick={() => setActiveTab('cash')}
            className="btn"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              borderRadius: '10px',
              background: activeTab === 'cash' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
              color: activeTab === 'cash' ? '#030712' : 'var(--text-main)',
              border: activeTab === 'cash' ? 'none' : '1px solid var(--border-card)',
              fontWeight: 'bold'
            }}
          >
            ⚡ UPI / Bank Cashout
          </button>
        </div>

        {/* NOTIFICATION MESSAGES */}
        {redemptionError && (
          <div style={{
            background: 'rgba(255, 71, 87, 0.1)',
            border: '1px solid rgba(255, 71, 87, 0.25)',
            color: 'var(--color-danger)',
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            ❌ {redemptionError}
          </div>
        )}

        {redemptionSuccess && (
          <div style={{
            background: 'rgba(0, 255, 135, 0.1)',
            border: '1px solid rgba(0, 255, 135, 0.25)',
            color: 'var(--color-accent)',
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            textAlign: 'center',
            wordBreak: 'break-all'
          }}>
            🎉 {redemptionSuccess}
          </div>
        )}

        {/* TAB 1: GIFT VOUCHER STORE */}
        {activeTab === 'vouchers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '25px'
            }}>
              {voucherOptions.map((v) => (
                <div key={v.type} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '2rem' }}>{v.icon}</span>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', color: v.color }}>{v.title}</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.badge}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Exchange your accumulated ad coins for official digital gift codes:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {v.tiers.map((tier) => {
                      const canAfford = userCoins >= tier.coins;
                      return (
                        <button
                          key={tier.rupee}
                          onClick={() => handleRedeemVoucher(v.type, tier.rupee, tier.coins)}
                          className={`btn ${canAfford ? 'btn-primary' : 'btn-secondary'}`}
                          style={{
                            padding: '12px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            borderRadius: '8px',
                            opacity: canAfford ? 1 : 0.65
                          }}
                        >
                          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹{tier.rupee} Code</span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>🪙 {tier.coins.toLocaleString()} Coins</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* MY REDEEMED VOUCHERS INVENTORY */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                🎁 My Redeemed Gift Vouchers & Codes ({vouchers.length})
              </h3>

              {vouchers.length === 0 ? (
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  color: 'var(--text-dark)',
                  border: '1px dashed rgba(255,255,255,0.06)',
                  borderRadius: '10px'
                }}>
                  <p>No vouchers redeemed yet. Watch ads to accumulate coins and redeem your first Play Store code!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                  {vouchers.map((vouch) => (
                    <div key={vouch.id} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(0,242,254,0.2)',
                      borderRadius: '10px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>{vouch.title}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff' }}>₹{vouch.rupeeAmount}</span>
                      </div>
                      
                      <div style={{
                        background: '#040814',
                        padding: '10px',
                        borderRadius: '6px',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'monospace',
                        color: 'var(--color-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        border: '1px solid rgba(0, 242, 254, 0.3)'
                      }}>
                        <span>{vouch.code}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(vouch.code);
                            alert(`Voucher Code ${vouch.code} copied!`);
                          }}
                          className="btn btn-primary"
                          style={{ padding: '4px 10px', fontSize: '0.7rem', borderRadius: '4px' }}
                        >
                          📋 Copy
                        </button>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Redeemed on: {vouch.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CASHOUT TO UPI / BANK */}
        {activeTab === 'cash' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* CASHOUT FORM */}
            <div className="glass-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Instant Cash Out</h3>

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

              <form onSubmit={handleCashoutSubmit}>
                <div className="input-group">
                  <label className="input-label" htmlFor="amount">Withdrawal Amount (₹)</label>
                  <input
                    className="input-field"
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter amount (Min: ₹500)"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                {/* METHOD SELECTOR */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label className="input-label">Transfer Method</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setMethod('upi')}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        background: method === 'upi' ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255,255,255,0.03)',
                        border: '1px solid ' + (method === 'upi' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'),
                        color: method === 'upi' ? 'var(--color-primary)' : 'var(--text-muted)'
                      }}
                    >
                      ⚡ UPI Transfer (arasu9629hf@okhdfcbank)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod('bank')}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        background: method === 'bank' ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255,255,255,0.03)',
                        border: '1px solid ' + (method === 'bank' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'),
                        color: method === 'bank' ? 'var(--color-primary)' : 'var(--text-muted)'
                      }}
                    >
                      🏦 Direct Bank Wire
                    </button>
                  </div>
                </div>

                {/* DYNAMIC FIELDS */}
                {method === 'upi' ? (
                  <div className="input-group animate-fade-in-up" style={{ marginBottom: '25px' }}>
                    <label className="input-label" htmlFor="upiId">Your UPI Virtual Address (VPA)</label>
                    <input
                      className="input-field"
                      type="text"
                      name="upiId"
                      id="upiId"
                      placeholder="username@ybl or phone@paytm"
                      value={formData.upiId}
                      onChange={handleChange}
                    />
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)' }}>🔒 Never share your UPI PIN. UPI PIN is not required to receive payouts.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }} className="animate-fade-in-up">
                    <div className="input-group" style={{ margin: 0 }}>
                      <label className="input-label" htmlFor="accountHolderName">Account Holder Name</label>
                      <input
                        className="input-field"
                        type="text"
                        name="accountHolderName"
                        id="accountHolderName"
                        placeholder="As printed on bank passbook"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group" style={{ margin: 0 }}>
                      <label className="input-label" htmlFor="accountNo">Bank Account Number</label>
                      <input
                        className="input-field"
                        type="text"
                        name="accountNo"
                        id="accountNo"
                        placeholder="Enter bank account number"
                        value={formData.accountNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div className="input-group" style={{ margin: 0 }}>
                        <label className="input-label" htmlFor="ifscCode">IFSC Code</label>
                        <input
                          className="input-field"
                          type="text"
                          name="ifscCode"
                          id="ifscCode"
                          placeholder="e.g. SBIN0001234"
                          value={formData.ifscCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-group" style={{ margin: 0 }}>
                        <label className="input-label" htmlFor="bankName">Bank Name</label>
                        <input
                          className="input-field"
                          type="text"
                          name="bankName"
                          id="bankName"
                          placeholder="e.g. SBI, HDFC"
                          value={formData.bankName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button className="btn btn-primary" type="submit" style={{ width: '100%', borderRadius: '10px' }}>
                  Submit Cashout Request
                </button>
              </form>
            </div>

            {/* TRANSACTION LEDGER */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Transaction History</h3>

              {transactions.length === 0 ? (
                <div style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: 'var(--text-dark)',
                  border: '1px dashed rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '40px'
                }}>
                  <div>
                    <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🧾</p>
                    <p>No transactions recorded yet.</p>
                  </div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', flexGrow: 1 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '12px 8px' }}>Date</th>
                        <th style={{ padding: '12px 8px' }}>Type</th>
                        <th style={{ padding: '12px 8px' }}>Amount</th>
                        <th style={{ padding: '12px 8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: tx.amount < 0 ? '#ffb3b3' : '#b3ffcc' }}>
                          <td style={{ padding: '12px 8px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{tx.date.split(',')[0]}</td>
                          <td style={{ padding: '12px 8px' }}>{tx.type}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{tx.amount < 0 ? '' : '+'}{tx.amount.toFixed(2)}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              background: tx.status === 'Completed' ? 'rgba(0,255,135,0.1)' : 'rgba(255,179,0,0.1)',
                              color: tx.status === 'Completed' ? 'var(--color-accent)' : '#ffb300',
                              border: '1px solid ' + (tx.status === 'Completed' ? 'rgba(0,255,135,0.2)' : 'rgba(255,179,0,0.2)')
                            }}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SPONSOR ADS */}
        <AdPlaceholder slot="Withdraw_Bottom_Ad" />
      </div>
    </DashboardLayout>
  );
}
