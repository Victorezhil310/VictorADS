import { MetadataRoute } from 'next';
import { legalConfig } from '@/config/legal.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = legalConfig.website;
  const lastModified = new Date();

  const publicRoutes = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/cookies',
    '/advertising-policy',
    '/refund-policy',
    '/contact',
    '/security',
    '/report-abuse',
    '/copyright',
    '/third-party-services',
    '/licenses',
    '/delete-account',
    '/data-export',
    '/ads.txt',
    '/app-ads.txt'
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.7,
  }));
}
