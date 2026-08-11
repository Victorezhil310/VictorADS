// Site-wide configuration for SEO, analytics, and ads
export const siteConfig = {
  name: "VictorADS",
  title: "VictorADS | Share Bandwidth, Watch Ads & Earn Money Online",
  description: "VictorADS is a secure digital rewards platform where you can convert your excess internet data and ad views into passive income. Explore our tools and articles on digital economy.",
  url: "https://victorads.com", // Replace with your actual domain when deployed
  author: "VictorADS Team",
  contactEmail: "support@victorads.com",
  
  // SEO Basics & Social Media
  ogImage: "/images/og-image.png",
  twitterHandle: "@VictorADS_Earn",
  
  // Analytics and Verification Keys (Placeholders - update with real ones when ready)
  googleAnalyticsId: "G-XXXXXXXXXX", // GA4 Measurement ID
  googleSearchConsoleToken: "google-site-verification-placeholder-code", // GSC verification code
  googleAdSensePublisherId: "pub-XXXXXXXXXXXXXXXX", // AdSense publisher ID (e.g. ca-pub-1234567890123456)
  
  // App-specific configs
  minWithdrawal: 500, // in Indian Rupees (₹)
  adRewardAmount: 2.50, // ₹ per ad watch
  dataRewardPerMB: 0.10, // ₹ per MB of simulated data shared
};
