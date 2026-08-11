import AdPlaceholder from '../../components/AdPlaceholder';
import { siteConfig } from '../../config/siteConfig';

export const metadata = {
  title: "Cookie Policy | VictorADS",
  description: "Read our Cookie Policy, understanding how we use session and tracking cookies to optimize your platform experience.",
};

export default function CookiePolicy() {
  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Cookies</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Cookie Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
          Last Updated: August 10, 2026
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p>
          This is the Cookie Policy for {siteConfig.name}, accessible from URL {siteConfig.url}. Like most professional websites, this site uses cookies—which are tiny files downloaded to your computer—to improve your experience.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your computer or mobile device by your web browser when you visit a site. They enable the server to remember your activity and preferences (such as log-in tokens, language settings, and display sizes) over a period of time.
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>2. How We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons detailed below:
          <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8' }}>
            <li><strong>Authentication & Account Sessions:</strong> We use cookies or local storage to keep you logged in to the dashboard. This prevents you from having to log in every single time you visit a new page.</li>
            <li><strong>Analytics Tracking:</strong> We use Google Analytics cookies to monitor traffic flows and understand which utility tools are most popular, helping us improve performance.</li>
            <li><strong>Advertising Delivery:</strong> Google AdSense uses cookies to deliver relevant advertising campaigns and prevent you from seeing the same ad repeatedly.</li>
          </ul>
        </p>

        <h2 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '15px' }}>3. Controlling and Disabling Cookies</h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site, including your ability to log in.
        </p>
      </div>

      <AdPlaceholder slot="Cookies_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
