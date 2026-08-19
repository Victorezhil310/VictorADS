const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔒 Running Production Secret Scanner...');

const ROOT_DIR = path.resolve(__dirname, '..');

// Regex patterns to detect high-entropy secrets or credential formats
const SECRET_PATTERNS = [
  { name: 'Firebase Admin Private Key', pattern: /-----BEGIN (RSA |EC |PGP |)PRIVATE KEY-----/ },
  { name: 'Generic API Key Secret', pattern: /(api_key|apikey|secret_key|app_secret|client_secret)\s*[:=]\s*['"][A-Za-z0-9_\-]{20,}['"]/i },
  { name: 'Razorpay Secret Key', pattern: /rzp_(live|test)_[A-Za-z0-9]{14,}/ },
  { name: 'JWT or Base64 Secret String', pattern: /(jwt_secret|auth_secret|encryption_key)\s*[:=]\s*['"][A-Za-z0-9+/=]{32,}['"]/i },
  { name: 'Service Account JSON Structure', pattern: /"type":\s*"service_account"/ },
  { name: 'Hardcoded Database Password', pattern: /(DATABASE_PASSWORD|db_password|db_pass)\s*[:=]\s*['"][^'"]{8,}['"]/i },
  { name: 'Firebase Admin Credentials', pattern: /firebase-adminsdk-[a-z0-9]+@[a-z0-9-]+\.iam\.gserviceaccount\.com/i }
];

// File extensions or directories to inspect
const EXCLUDED_DIRS = ['node_modules', '.next', '.git', 'out', 'dist', 'build', 'coverage'];
const IGNORED_FILES = ['.env.example', 'secret-scanner.js', 'package-lock.json', 'pnpm-lock.yaml'];

let secretDetected = false;
let detectedFiles = new Set();

function scanDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = path.relative(ROOT_DIR, fullPath);

    if (EXCLUDED_DIRS.some(ex => relativePath.startsWith(ex) || item === ex)) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (stat.isFile()) {
      if (IGNORED_FILES.includes(item)) {
        continue;
      }

    // Check if file is an active secret file like .env, .env.local, service-account.json
    if (item.startsWith('.env') && item !== '.env.example') {
      // Check if git tracks it
      try {
        const gitCheck = execSync(`git ls-files --error-unmatch "${relativePath}"`, { stdio: 'pipe' }).toString().trim();
        if (gitCheck) {
          console.error(`❌ Potential secret detected in file: ${relativePath} (Git-tracked environment file)`);
          secretDetected = true;
          detectedFiles.add(relativePath);
        }
      } catch (e) {
        // Not tracked by git, perfectly safe local file
        continue;
      }
      continue;
    }

      try {
        const content = fs.readFileSync(fullPath, 'utf8');

        for (const { name, pattern } of SECRET_PATTERNS) {
          if (pattern.test(content)) {
            console.error(`❌ Potential secret detected in file: ${relativePath}`);
            secretDetected = true;
            detectedFiles.add(relativePath);
            break; // Stop after first match in file to avoid log clutter
          }
        }
      } catch (err) {
        // Skip binary files
      }
    }
  }
}

scanDirectory(ROOT_DIR);

if (secretDetected) {
  console.error('\n🚨 SECRET SCAN FAILED! Production build aborted due to potential hardcoded secrets or git-tracked credentials.');
  console.error(`Affected files: ${Array.from(detectedFiles).join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ Secret Scan Passed. No committed secrets or exposed credentials detected.');
}
