import Link from 'next/link';
import AdPlaceholder from '../../components/AdPlaceholder';

export const metadata = {
  title: "About Us | VictorADS",
  description: "Learn more about VictorADS, our mission to build a transparent digital sharing economy, and how we help users monetize idle internet and ad attention.",
};

export default function About() {
  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">Our Story</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>About VictorADS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
          Unlocking the value of excess digital resources for users worldwide.
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '40px' }}>
        <section>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '10px' }}>Who We Are</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            VictorADS is a pioneering digital rewards and internet utility ecosystem established in 2026. We believe that in the age of fiber connections and mobile data plans, bandwidth is a commodity. Our platform acts as a secure intermediary, letting users monetize their surplus internet capacity and attention spans, turning idle network assets into real savings.
          </p>
        </section>

        <section style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '10px' }}>How Earning Works</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            We provide two primary monetization pathways:
          </p>
          <ul style={{ marginLeft: '20px', marginTop: '10px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <li><strong>Watch-to-Earn:</strong> Programmatic advertisers pay to present campaigns to verified audiences. We host these ad placements and return up to 70% of the CPM value to the user who watches them.</li>
            <li><strong>Data-Sharing (Bandwidth Selling):</strong> Secure corporate networks route web intelligence queries (like product price comparisons) through verified residential connections. We credit users based on the megabytes of traffic safely routed through their systems.</li>
          </ul>
        </section>

        <section style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '10px' }}>Safety & Privacy Priority</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Your privacy is our core concern. VictorADS does not access, collect, or read any local files, credentials, search history, or personal identifiers. Our client-side tools run in sandbox modes, only routing encrypted web traffic or generating files like PDFs directly in the browser. We maintain a zero-log policy for user traffic.
          </p>
        </section>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/register" className="btn btn-primary">
            Join the Sharing Economy
          </Link>
        </div>
      </div>

      <AdPlaceholder slot="About_Bottom_Ad" style={{ marginTop: '40px' }} />
    </main>
  );
}
