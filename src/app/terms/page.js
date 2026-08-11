import AdPlaceholder from '../../components/AdPlaceholder';
import { siteConfig } from '../../config/siteConfig';

export const metadata = {
  title: "Terms & Conditions | VictorADS",
  description: "Read our Terms and Conditions, understanding user eligibility, monetization rules, and invalid traffic limits.",
};

export default function TermsConditions() {
  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Agreement</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
          Last Updated: August 10, 2026
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p>
          Welcome to {siteConfig.name}! These terms and conditions outline the rules and regulations for the use of {siteConfig.name}'s Website, located at {siteConfig.url}. By accessing this website, we assume you accept these terms and conditions. Do not continue to use {siteConfig.name} if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>1. Account Registration and Restrictions</h2>
        <p>
          To access the earning features of the platform, you must create a user profile. Each individual is allowed to maintain only one registered account. Creating multiple accounts, registering duplicate credentials using the same IP address, or attempting to manipulate login sessions is strictly prohibited and will lead to account suspension.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>2. Earning Rules & Invalid Traffic</h2>
        <p>
          Users must interact with advertisements and share bandwidth in a genuine manner. You agree to the following obligations:
          <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8' }}>
            <li>Do not click on your own advertisements or encourage others to click on them artificially.</li>
            <li>Do not use bots, auto-clickers, emulators, or scripts to automate ad views or bandwidth sharing.</li>
            <li>Do not connect via VPNs, proxy networks, or Tor tunnels to manipulate location bidding rates.</li>
          </ul>
          Violation of these rules constitutes ad fraud and will result in the immediate forfeiture of your wallet balance.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>3. Payout and Settlements</h2>
        <p>
          Earning rewards will accumulate in your local profile wallet. Withdrawals are permitted once you reach the minimum threshold of ₹{siteConfig.minWithdrawal}. You must provide correct and verified payment credentials (such as UPI ID or Bank account fields). We are not responsible for transactions that fail or are routed incorrectly due to user-entered typos.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>4. Disclaimer of Warranties</h2>
        <p>
          The services, utilities, and blog articles provided on this website are distributed on an "as is" and "as available" basis without warranties of any kind. Earning rates fluctuate depending on advertising bidding budgets and network client demands.
        </p>
      </div>

      <AdPlaceholder slot="Terms_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
