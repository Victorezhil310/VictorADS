import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdPlaceholder from '../../../components/AdPlaceholder';
import { articles } from '../../../utils/contentLibrary';
import { siteConfig } from '../../../config/siteConfig';

// Generate static routes for all 25 articles
export async function generateStaticParams() {
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

// Generate dynamic SEO metadata for each article
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);

  if (!article) return {};

  const articleUrl = `${siteConfig.url}/articles/${slug}`;

  return {
    title: `${article.title}`,
    description: article.summary,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: articleUrl,
      type: "article",
      publishedTime: new Date(article.date).toISOString(),
      authors: [siteConfig.author],
      tags: article.keywords.split(',').map(s => s.trim()),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    }
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="section-container animate-fade-in-up" style={{ maxWidth: '800px', paddingBottom: '80px' }}>
      {/* BREADCRUMB */}
      <div style={{ marginBottom: '25px', fontSize: '0.9rem' }}>
        <Link href="/articles" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
          &larr; Back to Articles
        </Link>
      </div>

      {/* ARTICLE META HEADER */}
      <header style={{ marginBottom: '35px' }}>
        <span className={`badge ${
          article.category === 'Technology' || article.category === 'Web Development' ? 'badge-tech' : 
          article.category === 'Finance' ? 'badge-finance' : 'badge-security'
        }`} style={{ marginBottom: '15px' }}>
          {article.category}
        </span>
        
        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '15px' }}>
          {article.title}
        </h1>

        <div style={{
          display: 'flex',
          gap: '20px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          paddingBottom: '15px',
          borderBottom: '1px solid var(--border-card)'
        }}>
          <span>Published on: <strong>{article.date}</strong></span>
          <span>&bull;</span>
          <span>Reading time: <strong>{article.readTime}</strong></span>
          <span>&bull;</span>
          <span>Author: <strong>{siteConfig.author}</strong></span>
        </div>
      </header>

      {/* TOP AD UNIT */}
      <AdPlaceholder slot={`Article_Top_${slug}`} style={{ marginBottom: '30px' }} />

      {/* ARTICLE BODY */}
      <div
        className="article-body-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
        style={{
          fontSize: '1.05rem',
          lineHeight: '1.75',
          color: '#e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      />

      {/* BOTTOM AD UNIT */}
      <AdPlaceholder slot={`Article_Bottom_${slug}`} style={{ marginTop: '40px' }} />

      {/* CSS Modules-like styling local injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        .article-body-content h2 {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .article-body-content ul, .article-body-content ol {
          margin-left: 20px;
          padding-left: 10px;
          margin-bottom: 15px;
        }
        .article-body-content li {
          margin-bottom: 8px;
        }
        .article-body-content strong {
          color: var(--color-primary);
        }
      `}} />
    </main>
  );
}
