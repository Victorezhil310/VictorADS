import AdPlaceholder from '../../components/AdPlaceholder';
import { siteConfig } from '../../config/siteConfig';

export const metadata = {
  title: "Privacy Policy | VictorADS",
  description: "Read our privacy policy to understand how we secure your credentials and route encrypted bandwidth traffic safely.",
};

export default function PrivacyPolicy() {
  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Compliance</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
          Last Updated: August 10, 2026
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p>
          At {siteConfig.name}, accessible from {siteConfig.url}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {siteConfig.name} and how we use it.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>1. Information We Collect</h2>
        <p>
          If you register an account on our platform, we collect your username, email address, and a secure password. If you submit a withdrawal request, we collect payment routing details (such as your UPI ID, account holder name, account number, bank name, and IFSC code) solely to queue and process your requested payout transactions.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>2. How We Use Your Information</h2>
        <p>
          We use the collected data to run and maintain the application, personalize dashboard statistics, authorize logins, log transaction ledger lists, and prevent fraudulent activity or bot traffic. We do not sell your personal data to third parties.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>3. Network Traffic Routing</h2>
        <p>
          When you toggle bandwidth sharing on, our application routes general web queries through your network connection. This process is fully encrypted. We do not inspect, log, or store your personal browsing traffic, local files, cookies, or browser caches. Your local system acts only as a secure tunnel.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>4. Google AdSense & Third-Party Cookies</h2>
        <p>
          Google is one of the third-party vendors on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" style={{ color: 'var(--color-primary)' }} target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>5. General Data Protection Rights (GDPR & CCPA)</h2>
        <p>
          We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the right to access, rectify, or erase their personal credentials. You can delete your account credentials stored in local storage at any time by logging out and clearing your browser's site cache.
        </p>
      </div>

      <AdPlaceholder slot="Privacy_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
