import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig } from "../config/siteConfig";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ["watch ads and earn", "data to money", "sell internet bandwidth", "passive income", "UPI withdraw online", "make money online", "digital sharing economy"],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Monetize Your Internet`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }) {
  const gscCode1 = siteConfig.googleSearchConsoleToken; // -nL85juUcE0o48CM-D_4I4YDGWaBoP1PN6BFCYSphl0
  const gscCode2 = siteConfig.googleSearchConsoleTokenSecondary; // 0KMGLLs9N37APBf9DhUn8bNcnmUmewhwRCHE-R7slxk
  const adsenseAccount = siteConfig.googleAdSenseAccount; // ca-pub-6751037211810646
  const adsenseId = siteConfig.googleAdSensePublisherId; // ca-pub-6751037211810646
  const gaId = siteConfig.googleAnalyticsId;

  const isRealGa = gaId && !gaId.includes("G-XXXXXXXXXX");

  return (
    <html lang="en">
      <head>
        {/* Google AdSense Ownership Account Meta Tag */}
        <meta name="google-adsense-account" content={adsenseAccount} />

        {/* Google Search Console Verification Meta Tags */}
        <meta name="google-site-verification" content={gscCode1} />
        <meta name="google-site-verification" content={gscCode2} />
        
        {/* Google AdSense Direct Client Script Tag */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        {isRealGa && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <div className="main-wrapper">
          <Header />
          <div className="content-container">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
