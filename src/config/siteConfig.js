// Site-wide configuration for SEO, analytics, ads, and donations
export const siteConfig = {
  name: "VictorADS",
  title: "VictorADS | Share Bandwidth, Watch Ads & Earn Money Online",
  description: "VictorADS is a secure digital rewards platform where you can convert your excess internet data and ad views into passive income. Explore our tools and articles on digital economy.",
  url: "https://victor-ads.vercel.app", // Updated to your live Vercel domain!
  author: "VictorADS Team",
  contactEmail: "support@victorads.com",
  
  // SEO Basics & Social Media
  ogImage: "/images/og-image.png",
  twitterHandle: "@VictorADS_Earn",
  
  // Analytics and Verification Keys
  googleAnalyticsId: "G-XXXXXXXXXX",
  googleSearchConsoleToken: "PhqDCraPVcuNOgwktVSw2azc0jZV8jK2I4HSxFUygCE",
  googleSearchConsoleTokenSecondary: "uBcYkVShNH4xBS6Vhbt-F3dVAKaKWceQNek2H_dFrjs",
  googleAdSensePublisherId: "ca-pub-6751037211810646",
  googleAdSensePubCode: "pub-6751037211810646",
  
  // Financial & Donation Configs
  minWithdrawal: 500, // in Indian Rupees (₹)
  adRewardAmount: 2.50, // ₹ per ad watch
  dataRewardPerMB: 0.10, // ₹ per MB of simulated data shared
  platformCommissionPercent: 10, // 10% platform survival fee on marketplace trades
  
  // Official Donation UPI Configuration
  donationUpiId: "arasu9629hf@gmail.com",
  donationUpiName: "VictorADS Legal Platform Support",

  // Subscription Tiers
  subscriptionPlans: [
    {
      id: "vip_adfree",
      name: "VIP Ad-Free Member",
      price: 299,
      period: "Monthly",
      features: ["100% Ad-Free Experience", "2x Ad-Watching Reward (₹5.00/ad)", "Unlimited Utility Tools Usage", "Priority 24/7 Support"]
    },
    {
      id: "data_pro",
      name: "Data Trader Pro",
      price: 499,
      period: "Monthly",
      features: ["2x Bandwidth Payout Rate (₹0.20/MB)", "High-Speed Proxy Node Priority", "100% Ad-Free Experience", "Instant 5-Min UPI Withdrawals"]
    },
    {
      id: "enterprise_unlimited",
      name: "Enterprise Unlimited Supporter",
      price: 999,
      period: "Quarterly",
      features: ["All VIP & Data Pro Perks", "Zero Platform Commission", "Custom API Access for Data Selling", "Official Contributor Badge"]
    }
  ]
};
