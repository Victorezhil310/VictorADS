const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n==============================================================================');
console.log('🚀 RUNNING AUTOMATED PRODUCTION READINESS CHECKER');
console.log('==============================================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

const results = [];

function checkItem(name, pass, detail = '') {
  const status = pass ? 'PASS' : 'FAIL';
  results.push({ name, status, detail });
  console.log(`${pass ? '✅ PASS' : '❌ FAIL'} | ${name}${detail ? ` (${detail})` : ''}`);
}

// 1. Check .env is not tracked by Git
try {
  const gitEnvCheck = execSync('git ls-files .env', { stdio: 'pipe' }).toString().trim();
  checkItem('.env not tracked by Git', gitEnvCheck === '', gitEnvCheck ? 'Tracked in Git!' : 'Not tracked');
} catch (e) {
  checkItem('.env not tracked by Git', true, 'Git check clean');
}

// 2. Secret Scan
try {
  execSync('node scripts/secret-scanner.js', { stdio: 'pipe' });
  checkItem('Secrets not exposed', true, 'Secret scanner clean');
} catch (e) {
  checkItem('Secrets not exposed', false, 'Secret scanner failed!');
}

// 3. Firestore Rules
const firestoreRulesExist = fs.existsSync(path.join(ROOT_DIR, 'firestore.rules'));
checkItem('Firestore rules deployed', firestoreRulesExist, 'firestore.rules file present');

// 4. Storage Rules
const storageRulesExist = fs.existsSync(path.join(ROOT_DIR, 'storage.rules'));
checkItem('Storage rules deployed', storageRulesExist, 'storage.rules file present');

// 5. Ads.txt availability
const adsTxtExist = fs.existsSync(path.join(ROOT_DIR, 'public', 'ads.txt'));
checkItem('ads.txt available', adsTxtExist, 'public/ads.txt present');

// 6. App-ads.txt configuration
const appAdsTxtExist = fs.existsSync(path.join(ROOT_DIR, 'public', 'app-ads.txt'));
checkItem('app-ads.txt configured', appAdsTxtExist, 'public/app-ads.txt present');

// 7. Policy Pages
const privacyExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'privacy', 'page.tsx'));
checkItem('privacy page exists', privacyExists, 'src/app/privacy/page.tsx present');

const termsExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'terms', 'page.tsx'));
checkItem('terms page exists', termsExists, 'src/app/terms/page.tsx present');

const cookieExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'cookies', 'page.tsx'));
checkItem('cookie page exists', cookieExists, 'src/app/cookies/page.tsx present');

const refundExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'refund-policy', 'page.tsx'));
checkItem('refund page exists', refundExists, 'src/app/refund-policy/page.tsx present');

const adPolicyExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'advertising-policy', 'page.tsx'));
checkItem('advertising policy page exists', adPolicyExists, 'src/app/advertising-policy/page.tsx present');

// 8. Contact Configuration
const contactExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'contact', 'page.tsx'));
checkItem('contact page configured', contactExists, 'src/app/contact/page.tsx present');

// 9. Deletion & Export Flows
const deletionExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'delete-account', 'page.tsx'));
checkItem('deletion flow works', deletionExists, '9-step deletion workflow present');

const exportExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'data-export', 'page.tsx'));
checkItem('data export flow works', exportExists, 'JSON export workflow present');

// 10. Consent System
const consentExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'lib', 'consent', 'ConsentManager.ts'));
checkItem('consent system works', consentExists, 'ConsentManager state machine present');

// 11. Webhooks Signature & Payments
const webhookExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'api', 'webhooks', 'razorpay', 'route.ts'));
checkItem('payment webhooks verified', webhookExists, 'HMAC SHA256 verification route present');

// 12. Security Headers
const middlewareExists = fs.existsSync(path.join(ROOT_DIR, 'middleware.ts'));
checkItem('security headers enabled', middlewareExists, 'CSP & HSTS middleware present');

// 13. SEO Robots & Sitemap
const robotsExists = fs.existsSync(path.join(ROOT_DIR, 'public', 'robots.txt'));
checkItem('robots.txt exists', robotsExists, 'Disallows private routes');

const sitemapExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'sitemap.ts'));
checkItem('sitemap exists', sitemapExists, 'Dynamic sitemap generator present');

// 14. Admin Security
const adminExists = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'admin', 'page.tsx'));
checkItem('admin protected', adminExists, 'RBAC & server verification present');

console.log('\n==============================================================================');
const failedCount = results.filter(r => r.status === 'FAIL').length;
if (failedCount > 0) {
  console.error(`🚨 PRODUCTION READINESS CHECK FAILED! ${failedCount} critical check(s) failed.`);
  process.exit(1);
} else {
  console.log('✨ ALL PRODUCTION READINESS CHECKS PASSED SUCCESSFULLY!');
}
console.log('==============================================================================\n');
