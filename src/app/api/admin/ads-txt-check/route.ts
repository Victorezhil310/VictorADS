import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const adsTxtPath = path.join(process.cwd(), 'public', 'ads.txt');
    const appAdsTxtPath = path.join(process.cwd(), 'public', 'app-ads.txt');

    const checks = {
      adsTxtExists: fs.existsSync(adsTxtPath),
      appAdsTxtExists: fs.existsSync(appAdsTxtPath),
      hasSecrets: false,
      duplicates: [] as string[],
      validSyntax: true,
      publisherIdConfigured: false,
      entriesCount: 0
    };

    if (checks.adsTxtExists) {
      const content = fs.readFileSync(adsTxtPath, 'utf8');
      
      // Secret check
      if (/(secret|private_key|password|api_key)=/i.test(content)) {
        checks.hasSecrets = true;
      }

      // Check Publisher ID configuration
      if (!content.includes('TODO: ADD REAL PUBLISHER ID')) {
        checks.publisherIdConfigured = true;
      }

      // Parse lines for duplicates & syntax
      const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
      checks.entriesCount = lines.length;

      const seen = new Set<string>();
      for (const line of lines) {
        if (seen.has(line)) {
          checks.duplicates.push(line);
        }
        seen.add(line);

        // Standard IAB format check: domain, pubId, relationship, authorityId
        const parts = line.split(',');
        if (parts.length < 3) {
          checks.validSyntax = false;
        }
      }
    }

    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      checks
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
