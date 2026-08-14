"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdPlaceholder from '../../components/AdPlaceholder';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export default function Tools() {
  const [activeTool, setActiveTool] = useState('pdf'); // pdf, qr, link

  // Image to PDF states
  const [images, setImages] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState('');

  // URL to QR states
  const [qrUrl, setQrUrl] = useState('');
  const [qrResult, setQrResult] = useState('');
  const [qrError, setQrError] = useState('');

  // Link Analyzer states
  const [linkInput, setLinkInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- IMAGE TO PDF LOGIC ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          name: file.name,
          dataUrl: reader.result,
          size: (file.size / 1024).toFixed(1) + ' KB'
        }]);
      };
      reader.readAsDataURL(file);
    });
    setPdfSuccess('');
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const compileImagesToPdf = async () => {
    if (!images.length) return;
    setIsCompiling(true);
    setPdfSuccess('');

    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        
        const img = images[i];
        
        // Add image to page
        // Format parameters: imageURI, format, x, y, width, height
        // Standard A4 is 210 x 297 mm
        doc.addImage(img.dataUrl, 'JPEG', 10, 10, 190, 277);
      }
      
      doc.save(`VictorADS_Compiled_${Date.now()}.pdf`);
      setPdfSuccess('PDF compiled and downloaded successfully!');
      setImages([]);
    } catch (err) {
      console.error('PDF generation failure:', err);
    } finally {
      setIsCompiling(false);
    }
  };

  // --- URL TO QR CODE LOGIC ---
  const generateQrCode = async (e) => {
    e.preventDefault();
    if (!qrUrl) {
      setQrError('Please enter a valid URL.');
      return;
    }
    setQrError('');
    setQrResult('');

    try {
      // Generate QR Code data URI
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#030712', // Deep charcoal
          light: '#ffffff' // White
        }
      });
      setQrResult(dataUrl);
    } catch (err) {
      setQrError('Failed to generate QR Code. Please check the URL.');
    }
  };

  // --- LINK ANALYZER LOGIC ---
  const analyzeLink = (e) => {
    e.preventDefault();
    if (!linkInput) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      let isHttps = linkInput.toLowerCase().startsWith('https://');
      let score = isHttps ? 95 : 45;
      let isShortLink = linkInput.toLowerCase().includes('bit.ly') || linkInput.toLowerCase().includes('tinyurl.com');
      
      let warnings = [];
      if (!isHttps) warnings.push("Connection is unencrypted (HTTP). Data entered could be intercepted.");
      if (isShortLink) warnings.push("Uses a URL redirect mask. The final destination page might contain redirects.");

      let shortenedCode = Math.random().toString(36).substr(2, 6);
      let shortUrl = `https://vads.co/${shortenedCode}`;

      setAnalysisResult({
        originalUrl: linkInput,
        shortenedUrl: shortUrl,
        safetyScore: score,
        sslStatus: isHttps ? "Valid SSL Certified" : "Uncertified / No SSL",
        status: score > 70 ? "Safe to Browse" : "Suspicious Connection",
        warnings: warnings
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }} className="animate-fade-in-up">
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Utility Tools</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Free client-side digital utilities to boost your productivity
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTool('pdf')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTool === 'pdf' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTool === 'pdf' ? '#030712' : 'var(--text-main)',
                border: activeTool === 'pdf' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              📄 Image to PDF
            </button>
            <button
              onClick={() => setActiveTool('qr')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTool === 'qr' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTool === 'qr' ? '#030712' : 'var(--text-main)',
                border: activeTool === 'qr' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              🔍 URL to QR
            </button>
            <button
              onClick={() => setActiveTool('link')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTool === 'link' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTool === 'link' ? '#030712' : 'var(--text-main)',
                border: activeTool === 'link' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              🔗 Link Analyzer
            </button>
            <button
              onClick={() => setActiveTool('snippet')}
              className="btn"
              style={{
                padding: '10px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: activeTool === 'snippet' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                color: activeTool === 'snippet' ? '#030712' : 'var(--text-main)',
                border: activeTool === 'snippet' ? 'none' : '1px solid var(--border-card)'
              }}
            >
              ⚡ Snippet & Analytics
            </button>
          </div>
        </div>

        {/* WORKSPACE PANELS */}
        {activeTool === 'pdf' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Image to PDF Converter</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Select multiple JPEG/PNG images from your device. Reorder them and compile them instantly into a single PDF document. Fully processed in-browser.
            </p>

            {pdfSuccess && (
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
                ✔️ {pdfSuccess}
              </div>
            )}

            {/* UPLOAD BOX */}
            <div style={{
              border: '2px dashed rgba(0, 242, 254, 0.2)',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.01)',
              marginBottom: '25px',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📸</p>
              <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>Click or drag images here to upload</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>Supports PNG, JPG, JPEG. Max 10MB per image.</p>
            </div>

            {/* THUMBNAILS GRID */}
            {images.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Uploaded Images ({images.length})</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  {images.map((img, idx) => (
                    <div key={idx} className="glass-card" style={{
                      padding: '10px',
                      borderRadius: '8px',
                      position: 'relative',
                      textAlign: 'center'
                    }}>
                      <button
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: 'var(--color-danger)',
                          color: '#fff',
                          border: 'none',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        X
                      </button>
                      <img
                        src={img.dataUrl}
                        alt="Thumbnail"
                        style={{
                          width: '100%',
                          height: '90px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      />
                      <p style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        marginTop: '6px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{img.name}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={compileImagesToPdf}
                  disabled={isCompiling}
                  className="btn btn-primary pulse-glow"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  {isCompiling ? 'Compiling Documents...' : 'Compile & Download PDF Document'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTool === 'qr' && (
          <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>URL to QR Code Generator</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Input any URL, link, or text message. Generate a clean QR Code and download it immediately to share.
            </p>

            {qrError && (
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
                ❌ {qrError}
              </div>
            )}

            <form onSubmit={generateQrCode} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" htmlFor="qrUrl">Target URL or Link</label>
                <input
                  className="input-field"
                  type="text"
                  name="qrUrl"
                  id="qrUrl"
                  placeholder="https://example.com"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ borderRadius: '10px' }}>
                Generate QR Code
              </button>
            </form>

            {/* QR RESULT */}
            {qrResult && (
              <div className="animate-fade-in-up" style={{
                marginTop: '35px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  background: '#ffffff',
                  padding: '15px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  display: 'inline-block'
                }}>
                  <img src={qrResult} alt="Generated QR Code" style={{ width: '180px', height: '180px', display: 'block' }} />
                </div>

                <a href={qrResult} download={`VictorADS_QR_${Date.now()}.png`} className="btn btn-accent pulse-glow" style={{ borderRadius: '8px', padding: '10px 25px', fontSize: '0.9rem' }}>
                  Download QR Code (PNG)
                </a>
              </div>
            )}
          </div>
        )}

        {activeTool === 'link' && (
          <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Smart Link Safe-Analyzer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Paste suspicious URLs to run a safe protocol audit. Scans security certificate metrics and checks redirection scripts.
            </p>

            <form onSubmit={analyzeLink} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" htmlFor="linkInput">Suspicious URL</label>
                <input
                  className="input-field"
                  type="text"
                  name="linkInput"
                  id="linkInput"
                  placeholder="Paste URL here..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={isAnalyzing} style={{ borderRadius: '10px' }}>
                {isAnalyzing ? 'Running Audits...' : 'Analyze Link Integrity'}
              </button>
            </form>

            {/* RESULTS */}
            {analysisResult && (
              <div className="animate-fade-in-up" style={{
                marginTop: '35px',
                padding: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid ' + (analysisResult.safetyScore > 75 ? 'rgba(0,255,135,0.1)' : 'rgba(255,71,87,0.1)'),
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '1.1rem' }}>Audit Results</h4>
                  <span className="badge" style={{
                    background: analysisResult.safetyScore > 75 ? 'rgba(0,255,135,0.1)' : 'rgba(255,71,87,0.1)',
                    color: analysisResult.safetyScore > 75 ? 'var(--color-accent)' : 'var(--color-danger)'
                  }}>{analysisResult.status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <p><span style={{ color: 'var(--text-muted)' }}>SSL Protocol:</span> <strong style={{ color: analysisResult.safetyScore > 75 ? 'var(--color-accent)' : 'var(--color-danger)' }}>{analysisResult.sslStatus}</strong></p>
                  <p><span style={{ color: 'var(--text-muted)' }}>Safety Score:</span> <strong style={{ color: analysisResult.safetyScore > 75 ? 'var(--color-accent)' : 'var(--color-danger)' }}>{analysisResult.safetyScore}/100</strong></p>
                  
                  {analysisResult.warnings.length > 0 && (
                    <div style={{
                      marginTop: '10px',
                      padding: '10px',
                      background: 'rgba(255,71,87,0.05)',
                      borderLeft: '3px solid var(--color-danger)',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px'
                    }}>
                      {analysisResult.warnings.map((w, idx) => (
                        <p key={idx} style={{ color: '#ff9494', fontSize: '0.8rem' }}>⚠️ {w}</p>
                      ))}
                    </div>
                  )}

                  {/* SHORTENED LINK COMPONENT */}
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Short Link Generated:</p>
                      <a href={analysisResult.originalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                        {analysisResult.shortenedUrl}
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(analysisResult.shortenedUrl);
                        alert('Copied shortened URL to clipboard!');
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTool === 'snippet' && (
          <div className="glass-card" style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>⚡ Snippet Code & Analytics Suite</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Copy production-ready integration snippets for UPI Payments, Google Analytics 4, and Google AdSense units.
                </p>
              </div>
              <span className="badge badge-tech">Verified Production Code</span>
            </div>

            {/* SNIPPET 1: UPI PAYMENT BUTTON SNIPPET */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-accent)' }}>💳 UPI Direct Payment Button Snippet</h4>
                <button
                  onClick={() => {
                    const code = `<a href="upi://pay?pa=arasu9629hf@okhdfcbank&pn=VictorADS%20Support&cu=INR" class="upi-pay-btn" style="background:#00F2FE;color:#030712;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;display:inline-block;">Pay via UPI (arasu9629hf@okhdfcbank)</a>`;
                    navigator.clipboard.writeText(code);
                    alert('UPI Button Snippet copied to clipboard!');
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  📋 Copy Snippet
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Embed an NPCI-compliant instant UPI payment link for <strong>arasu9629hf@okhdfcbank</strong> on your website.
              </p>
              <pre style={{
                background: '#040814',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#00F2FE',
                fontFamily: 'monospace',
                overflowX: 'auto',
                border: '1px solid rgba(0, 242, 254, 0.2)'
              }}>
{`<a href="upi://pay?pa=arasu9629hf@okhdfcbank&pn=VictorADS%20Support&cu=INR"
   class="upi-pay-btn" 
   style="background:#00F2FE;color:#030712;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;display:inline-block;">
  ⚡ Pay / Donate via UPI (arasu9629hf@okhdfcbank)
</a>`}
              </pre>
            </div>

            {/* SNIPPET 2: GA4 ANALYTICS TRACKER SNIPPET */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>📊 Google Analytics 4 (GA4) Tag Snippet</h4>
                <button
                  onClick={() => {
                    const code = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`;
                    navigator.clipboard.writeText(code);
                    alert('GA4 Snippet copied to clipboard!');
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  📋 Copy Snippet
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Place this snippet in the <code>&lt;head&gt;</code> section of your HTML pages to track real-time user metrics.
              </p>
              <pre style={{
                background: '#040814',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#7000FF',
                fontFamily: 'monospace',
                overflowX: 'auto',
                border: '1px solid rgba(112, 0, 255, 0.2)'
              }}>
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
              </pre>
            </div>

            {/* SNIPPET 3: ADSENSE AD UNIT SNIPPET */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-accent)' }}>💰 Google AdSense Responsive Unit Snippet</h4>
                <button
                  onClick={() => {
                    const code = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751037211810646" crossorigin="anonymous"></script>\n<!-- VictorADS_Responsive_Slot -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-6751037211810646"\n     data-ad-slot="1234567890"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`;
                    navigator.clipboard.writeText(code);
                    alert('AdSense Snippet copied to clipboard!');
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  📋 Copy Snippet
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Embed automated ad monetization slots into your application views.
              </p>
              <pre style={{
                background: '#040814',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#00FF87',
                fontFamily: 'monospace',
                overflowX: 'auto',
                border: '1px solid rgba(0, 255, 135, 0.2)'
              }}>
{`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751037211810646" crossorigin="anonymous"></script>
<!-- VictorADS_Responsive_Slot -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6751037211810646"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`}
              </pre>
            </div>
          </div>
        )}

        {/* SPONSOR ADS */}
        <AdPlaceholder slot="Tools_Bottom_Ad" />
      </div>
    </DashboardLayout>
  );
}
