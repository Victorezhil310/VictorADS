import AdPlaceholder from '../../components/AdPlaceholder';
import { siteConfig } from '../../config/siteConfig';

export const metadata = {
  title: "Disclaimer | VictorADS",
  description: "Read our Disclaimer, clarifying financial earning representations, technical liability limits, and educational content bounds.",
};

export default function Disclaimer() {
  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Notice</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Disclaimer</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
          Last Updated: August 10, 2026
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p>
          If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at {siteConfig.contactEmail}.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>1. General Information</h2>
        <p>
          All the information on this website—{siteConfig.url}—is published in good faith and for general information purpose only. {siteConfig.name} does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>2. Financial Earnings Disclaimer</h2>
        <p>
          Monetization metrics displayed in your dashboard (such as ₹2.50 per ad watch or ₹0.10 per MB shared) are dependent on active advertiser bidding budgets and client data routing requests. We do not guarantee a fixed, recurring, or specific volume of passive income. Earning rates can fluctuate, and results will vary based on device uptime, regional demand, and network quality. This is not a employment program or investment scheme.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>3. Technical Risk & Bandwidth Selling</h2>
        <p>
          By activating bandwidth sharing, you authorize the application to route encrypted data packets through your network connection. While {siteConfig.name} runs comprehensive security screenings on all corporate clients using the proxy pool, we do not accept liability for internet service provider (ISP) contract violations, speed throttling, data cap overages, or network failures resulting from background traffic routing.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>4. Consent</h2>
        <p>
          By using our website, you hereby consent to our disclaimer and agree to its terms.
        </p>
      </div>

      <AdPlaceholder slot="Disclaimer_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
