import { siteConfig } from '../config/siteConfig';
import { articles } from '../utils/contentLibrary';

export default async function sitemap() {
  const baseUrl = siteConfig.url || 'https://victor-ads.vercel.app';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/cookies',
    '/donate',
    '/subscriptions',
    '/withdraw',
    '/marketplace',
    '/tools',
    '/dashboard',
    '/login',
    '/register',
    '/articles',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/articles' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic article routes (25 high-quality articles)
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
