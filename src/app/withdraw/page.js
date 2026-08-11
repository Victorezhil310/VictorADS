"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function Withdraw() {
  const [user, setUser] = useState(null);
  const [method, setMethod] = useState('upi'); // upi or bank
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
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
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
      setError('Insufficient funds in wallet.');
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
        bankName: formData.bankName || 'Unknown Bank'
      };
    }

    // Process withdrawal
    const response = mockDB.requestWithdrawal(withdrawAmt, method, details);

    if (response.success) {
      setSuccess(`Withdrawal request of ₹${withdrawAmt} submitted successfully!`);
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

  if (!user) return null;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }} className="animate-fade-in-up">
        {/* HEADER */}
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Withdraw Rewards</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Transfer your wallet balance straight to your UPI account or Bank
          </p>
        </div>

        {/* DETAILS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* FORM CARD */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Payout Configuration</h3>

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
                    ⚡ UPI Payment
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
                    🏦 Bank Transfer
                  </button>
                </div>
              </div>

              {/* DYNAMIC FIELDS */}
              {method === 'upi' ? (
                <div className="input-group animate-fade-in-up" style={{ marginBottom: '25px' }}>
                  <label className="input-label" htmlFor="upiId">UPI Virtual Address (VPA)</label>
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

          {/* TRANSACTION LEDGER CARD */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Transaction Ledger</h3>

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
                  <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Submit a withdrawal or accumulate ad views to start tracking ledger files.</p>
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

        {/* ADS PLACEMENT */}
        <AdPlaceholder slot="Withdraw_Bottom_Ad" />
      </div>
    </DashboardLayout>
  );
}
