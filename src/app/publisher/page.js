"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { mockDB } from '../../utils/mockDB';
import { siteConfig } from '../../config/siteConfig';

export default function PublisherDashboard() {
  const [user, setUser] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('autotag');
  const [copiedZone, setCopiedZone] = useState('');

  useEffect(() => {
    setUser(mockDB.getCurrentUser());
  }, []);

  const stats = {
    impressions: '248,910',
    clicks: '6,420',
    ecpm: '$2.85',
    ctr: '2.58%',
    totalRevenueUsd: '$709.39',
    totalRevenueInr: '₹58,879.00'
  };

  const zones = [
    {
      id: 'zsahbecst9',
      name: 'AdCash AutoTag Engine',
      type: 'AutoTag (Popunder + IPP + Interstitial)',
      ecpm: '$3.85',
      status: 'Active / Multi-Tag',
      code: `<script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>\n<script type="text/javascript">\n    aclib.runAutoTag({\n        zoneId: 'zsahbecst9',\n    });\n</script>`
    },
    {
      id: 'pop_99201',
      name: 'Global High-CPM Popunder',
      type: 'Popunder (On Click)',
      ecpm: '$4.10',
      status: 'Active',
      code: `<script type="text/javascript">\n  (function(s,o,u,r,c,e){c=s.createElement(o);e=s.getElementsByTagName(o)[0];c.async=1;c.src=u;e.parentNode.insertBefore(c,e);})(document,'script','//acscdn.com/script/popunder.js');\n</script>`
    },
    {
      id: 'ipp_88412',
      name: 'In-Page Push Notification (IPP)',
      type: 'Native Push Banner',
      ecpm: '$2.15',
      status: 'Active',
      code: `<script type="text/javascript" src="//acscdn.com/script/ipp.js" data-zone="ipp_88412"></script>`
    },
    {
      id: 'int_55102',
      name: 'Full Screen Interstitial Video',
      type: 'Interstitial Ad',
      ecpm: '$5.20',
      status: 'Active',
      code: `<script type="text/javascript" src="//acscdn.com/script/interstitial.js" data-zone="int_55102"></script>`
    },
    {
      id: 'ban_11094',
      name: 'Responsive Native Banner',
      type: '728x90 & 300x250 Banner',
      ecpm: '$1.90',
      status: 'Active',
      code: `<script type="text/javascript" src="//acscdn.com/script/banner.js" data-zone="ban_11094"></script>`
    }
  ];

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedZone(id);
    setTimeout(() => setCopiedZone(''), 2000);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in-up">
        {/* TOP PUBLISHER BANNER */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(112, 0, 255, 0.08) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          borderRadius: '16px',
          padding: '25px 30px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-finance">🌐 AdCash Publisher Engine</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>Real-time CPM Tracking</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', marginTop: '6px', fontWeight: '800' }}>AdCash Publisher Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Manage website zones, AutoTag scripts (Zone ID: <code>zsahbecst9</code>), and monitor eCPM revenue.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="/withdraw" className="btn btn-accent pulse-glow" style={{ borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem' }}>
              ⚡ Instant Cashout (arasu9629hf@okhdfcbank)
            </a>
          </div>
        </div>

        {/* OVERVIEW STATS WIDGETS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Impressions</p>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '5px' }}>
              {stats.impressions}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>Global network traffic</p>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Clicks</p>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent)', marginTop: '5px' }}>
              {stats.clicks}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>CTR: {stats.ctr}</p>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average eCPM</p>
            <h2 style={{ fontSize: '1.8rem', color: '#ffb300', marginTop: '5px' }}>
              {stats.ecpm}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>High-CPM Tier 1/2 traffic</p>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Publisher Earnings</p>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent)', marginTop: '5px' }}>
              {stats.totalRevenueUsd}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '4px', fontWeight: 'bold' }}>
              {stats.totalRevenueInr}
            </p>
          </div>
        </div>

        {/* ACTIVE ZONES & AD FORMATS TABLE */}
        <div className="glass-card" style={{ padding: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem' }}>AdCash Active Zones & Formats</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Embed these code tags on your website to monetize your traffic with AdCash AutoTag or specific formats.
              </p>
            </div>
            <span className="badge badge-tech">AutoTag Zone: zsahbecst9</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 10px' }}>Zone ID</th>
                  <th style={{ padding: '12px 10px' }}>Zone Name</th>
                  <th style={{ padding: '12px 10px' }}>Format Type</th>
                  <th style={{ padding: '12px 10px' }}>Avg. eCPM</th>
                  <th style={{ padding: '12px 10px' }}>Status</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right' }}>Integration Code</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 10px', fontFamily: 'monospace', color: 'var(--color-accent)', fontWeight: 'bold' }}>{zone.id}</td>
                    <td style={{ padding: '14px 10px', fontWeight: '600' }}>{zone.name}</td>
                    <td style={{ padding: '14px 10px', color: 'var(--text-muted)' }}>{zone.type}</td>
                    <td style={{ padding: '14px 10px', color: '#ffb300', fontWeight: 'bold' }}>{zone.ecpm}</td>
                    <td style={{ padding: '14px 10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        background: 'rgba(0, 255, 135, 0.1)',
                        color: 'var(--color-accent)',
                        border: '1px solid rgba(0, 255, 135, 0.2)'
                      }}>
                        {zone.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleCopyCode(zone.code, zone.id)}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '6px' }}
                      >
                        {copiedZone === zone.id ? '✅ Copied!' : '📋 Get Code'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CODE SNIPPET PREVIEW BOX */}
        <div className="glass-card" style={{ padding: '25px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--color-primary)' }}>
            ⚡ Active AdCash AutoTag Integration Snippet
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
            This snippet is integrated into your website's <code>&lt;head&gt;</code> element for Zone ID <strong>zsahbecst9</strong>:
          </p>

          <pre style={{
            background: '#040814',
            padding: '16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            color: '#00F2FE',
            fontFamily: 'monospace',
            overflowX: 'auto',
            border: '1px solid rgba(0, 242, 254, 0.2)'
          }}>
{`<script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
<script type="text/javascript">
    aclib.runAutoTag({
        zoneId: 'zsahbecst9',
    });
</script>`}
          </pre>
        </div>

        {/* GEOGRAPHIC TRAFFIC BREAKDOWN */}
        <div className="glass-card" style={{ padding: '25px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📊 Top Revenue Countries</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🇮🇳 India (IN)</p>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--color-accent)', marginTop: '4px' }}>₹32,450.00</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginTop: '2px' }}>112,400 Impressions</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🇺🇸 United States (US)</p>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginTop: '4px' }}>$214.50</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginTop: '2px' }}>42,800 Impressions</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🇬🇧 United Kingdom (UK)</p>
              <h4 style={{ fontSize: '1.3rem', color: '#ffb300', marginTop: '4px' }}>$128.80</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginTop: '2px' }}>24,100 Impressions</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🇪🇺 European Union (EU)</p>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--color-purple)', marginTop: '4px' }}>€152.00</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginTop: '2px' }}>31,200 Impressions</p>
            </div>
          </div>
        </div>

        {/* SPONSOR ADS */}
        <AdPlaceholder slot="Publisher_Bottom_Ad" />
      </div>
    </DashboardLayout>
  );
}
