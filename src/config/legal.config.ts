// ==============================================================================
// LEGAL & COMPLIANCE CONFIGURATION SYSTEM
// Configuration-driven legal placeholders derived from environment variables.
// NO FAKE REGISTRATION NUMBERS, LAWSUITS, OR CERTIFICATIONS ARE GENERATED.
// ==============================================================================

export interface LegalConfig {
  companyName: string;
  legalEntityName: string;
  website: string;
  supportEmail: string;
  businessEmail: string;
  privacyEmail: string;
  country: string;
  termsVersion: string;
  privacyVersion: string;
  lastUpdated: string;
}

export const getLegalConfig = (): LegalConfig => {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || process.env.SUPPORT_EMAIL || 'support@example.com';
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || process.env.BUSINESS_EMAIL || 'biz@example.com';
  const privacyEmail = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || process.env.PRIVACY_EMAIL || 'privacy@example.com';

  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || process.env.COMPANY_NAME || 'Production Security App Inc.',
    legalEntityName: process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME || process.env.LEGAL_ENTITY_NAME || 'Production Security App Inc.',
    website: process.env.NEXT_PUBLIC_APP_URL || 'https://example.com',
    supportEmail,
    businessEmail,
    privacyEmail,
    country: process.env.NEXT_PUBLIC_COUNTRY || process.env.COUNTRY || 'United States',
    termsVersion: '1.0.0',
    privacyVersion: '1.0.0',
    lastUpdated: 'August 16, 2026'
  };
};

export const legalConfig = getLegalConfig();
