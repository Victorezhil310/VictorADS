const fs = require('fs');
const path = require('path');

console.log('📞 Running Contact Configuration Validator...');

// In production, required contact values must be present and valid email formats
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

const supportEmail = process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
const businessEmail = process.env.BUSINESS_EMAIL || process.env.NEXT_PUBLIC_BUSINESS_EMAIL;
const privacyEmail = process.env.PRIVACY_EMAIL || process.env.NEXT_PUBLIC_PRIVACY_EMAIL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (isProduction) {
  let missing = [];
  if (!supportEmail || !emailRegex.test(supportEmail)) missing.push('SUPPORT_EMAIL');
  if (!businessEmail || !emailRegex.test(businessEmail)) missing.push('BUSINESS_EMAIL');
  if (!privacyEmail || !emailRegex.test(privacyEmail)) missing.push('PRIVACY_EMAIL');

  if (missing.length > 0) {
    console.error(`❌ CONTACT CONFIGURATION ERROR: Missing or invalid production contact emails: ${missing.join(', ')}`);
    console.error('Production builds require legitimate contact email configuration.');
    process.exit(1);
  }
}

console.log('✅ Contact Configuration Validated.');
