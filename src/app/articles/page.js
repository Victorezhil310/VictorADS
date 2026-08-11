"use client";

import { useState } from 'react';
import Link from 'next/link';
import AdPlaceholder from '../../components/AdPlaceholder';
import { articles } from '../../utils/contentLibrary';

export default function ArticlesIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories
  const categories = ['All', 'Finance', 'Technology', 'Cybersecurity', 'Marketing', 'SEO', 'Web Development'];

  // Filtered list
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="section-container animate-fade-in-up" style={{ minHeight: '85vh', paddingBottom: '80px' }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-tech">VictorADS Library</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Digital Knowledge Base</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px', maxWidth: '600px', margin: '6px auto 0' }}>
          Explore articles on passive earning, secure proxies, digital finance, search engine optimization, and modern web safety.
        </p>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '35px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-card)'
      }}>
        {/* Category List */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="btn"
              style={{
                padding: '8px 16px',
                fontSize: '0.8rem',
                borderRadius: '20px',
                background: activeCategory === cat ? 'var(--grad-primary)' : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat ? '#030712' : 'var(--text-muted)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-card)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <input
            className="input-field"
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 18px', fontSize: '0.9rem', borderRadius: '25px' }}
          />
        </div>
      </div>

      {/* AD BLOCK */}
      <AdPlaceholder slot="Articles_Index_Top" style={{ marginBottom: '40px' }} />

      {/* ARTICLES GRID */}
      {filteredArticles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-dark)',
          border: '1px dashed rgba(255,255,255,0.05)',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🔍</p>
          <p>No articles match your criteria.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Try adjusting your search terms or selecting a different category filter.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredArticles.map((art) => (
            <article key={art.slug} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <span className={`badge ${
                art.category === 'Technology' || art.category === 'Web Development' ? 'badge-tech' : 
                art.category === 'Finance' ? 'badge-finance' : 'badge-security'
              }`} style={{ alignSelf: 'flex-start' }}>
                {art.category}
              </span>
              <h3 style={{ fontSize: '1.3rem' }}>
                <Link href={`/articles/${art.slug}`} style={{ color: 'var(--text-main)', transition: 'color var(--transition-fast)' }}>
                  {art.title}
                </Link>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {art.summary}
              </p>
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dark)',
                paddingTop: '15px',
                borderTop: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span>{art.date}</span>
                <span>{art.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* AD BLOCK */}
      <AdPlaceholder slot="Articles_Index_Bottom" style={{ marginTop: '40px' }} />
    </main>
  );
}
