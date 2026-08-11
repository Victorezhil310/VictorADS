import { articles } from "../utils/contentLibrary";
import { siteConfig } from "../config/siteConfig";

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString().split('T')[0];

  // Static site pages
  const staticRoutes = [
    "",
    "/articles",
    "/subscriptions",
    "/donate",
    "/marketplace",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/subscriptions" || route === "/donate" ? 0.9 : 0.6,
  }));

  // Dynamic articles routes
  const articleRoutes = articles.map((art) => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
