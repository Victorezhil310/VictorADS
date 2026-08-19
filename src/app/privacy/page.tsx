import React from 'react';
import { Metadata } from 'next';
import { legalConfig } from '@/config/legal.config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${legalConfig.companyName}`,
  description: `Comprehensive Privacy Policy for ${legalConfig.companyName} covering Firebase services, payment processing, cookie policies, and data rights.`,
  alternates: {
    canonical: `${legalConfig.website}/privacy`
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-200">
      <div className="border-b border-slate-800 pb-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-sm text-slate-400">
          Last Updated: {legalConfig.lastUpdated} | Version: {legalConfig.privacyVersion}
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
          <p>
            Welcome to {legalConfig.companyName} ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs our web applications, mobile applications, and associated digital services operated by {legalConfig.legalEntityName} in {legalConfig.country}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when registering an account, making digital purchases, subscribing to services, or contacting support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Account Information</h2>
          <p>
            Account creation requires basic identity markers including your email address, display name, and unique authentication identifier assigned via Firebase Authentication.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Device Information</h2>
          <p>
            When accessing our application, we automatically collect certain technical device parameters, including IP address, browser type, operating system version, device model, and system language settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Usage Analytics</h2>
          <p>
            We utilize automated analytics services (including Google Analytics and Firebase Analytics) to understand feature engagement, session length, page request counts, and error event occurrences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Advertising Data</h2>
          <p>
            In free or supported tiers, authorized advertising partners (such as Google AdSense and Google AdMob) may collect advertising identifiers, IP addresses, and interaction metrics to deliver compliant ad placements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Cookies and Similar Technologies</h2>
          <p>
            We store essential local state tokens, authentication cookies, and consent preferences. Detailed cookie breakdowns can be reviewed on our dedicated <a href="/cookies" className="text-cyan-400 underline">Cookie Policy</a> page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Firebase Services</h2>
          <p>
            Our core architecture uses Google Firebase infrastructure, including Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase App Check, Cloud Functions, and Firebase Crashlytics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Advertising Partners</h2>
          <p>
            Third-party advertising partners operate under their respective privacy disclosures. We integrate authorized digital sellers documented in our public <a href="/ads.txt" className="text-cyan-400 underline">ads.txt</a> and <a href="/app-ads.txt" className="text-cyan-400 underline">app-ads.txt</a> files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Payment Providers</h2>
          <p>
            Payment transactions are processed through authorized payment gateways (e.g., Razorpay). Sensitive payment credentials (card numbers, CVV) are transmitted directly to the gateway and are never stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. How Information Is Used</h2>
          <p>
            Collected data is processed strictly for: authenticating users, managing digital subscriptions, verifying payment signatures, delivering core application services, monitoring security events, and complying with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. How Information Is Shared</h2>
          <p>
            We do not sell personal data. Information is shared only with necessary service infrastructure providers (Firebase, Payment Gateways), legal authorities under valid legal compulsion, or with your explicit consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">13. Data Retention</h2>
          <p>
            Active user profile data is retained as long as your account remains open. Financial transaction records and security audit logs are retained for legally mandatory periods required by tax and accounting regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">14. Data Security</h2>
          <p>
            We implement strict security measures including TLS encryption in transit, server-side access controls, Firestore security rules, and secret scanning protections. No transmission over the Internet is 100% immune to all hypothetical risks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">15. User Rights</h2>
          <p>
            Depending on your jurisdiction, you have rights to access, inspect, rectify, port, or request erasure of your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">16. Data Deletion</h2>
          <p>
            Authenticated users can initiate account deletion at any time via our automated <a href="/delete-account" className="text-cyan-400 underline">Delete Account</a> workflow.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">17. Children's Privacy</h2>
          <p>
            Our application is not directed at children under the age of 13 (or 16 in certain European jurisdictions). We do not knowingly collect personal information from minors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">18. International Data Transfers</h2>
          <p>
            Data may be stored and processed on cloud servers located outside your home country. All cross-border transfers utilize compliant data protection safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">19. Third-Party Services</h2>
          <p>
            A full inventory of third-party SDKs, sub-processors, and official policy links is maintained on our <a href="/third-party-services" className="text-cyan-400 underline">Third-Party Services</a> page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">20. Changes to This Privacy Policy</h2>
          <p>
            We update this Privacy Policy periodically to reflect architectural updates or regulatory changes. Revisions will be published here with an updated version number and date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">21. Contact Information</h2>
          <p>
            For privacy inquiries or data rights requests, contact our privacy compliance team at{' '}
            <a href={`mailto:${legalConfig.privacyEmail}`} className="text-cyan-400 underline">{legalConfig.privacyEmail}</a> or write to {legalConfig.companyName}, {legalConfig.country}.
          </p>
        </section>

      </div>
    </main>
  );
}
