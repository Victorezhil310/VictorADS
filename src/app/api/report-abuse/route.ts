import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// Basic in-memory rate limiting map for report submissions
const ipRateMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastSub = ipRateMap.get(ip) || 0;

    // Rate Limit: Allow 1 report submission per 60 seconds per IP
    if (now - lastSub < 60000) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please wait 60 seconds.' }, { status: 429 });
    }

    const { category, description, contactEmail } = await req.json();

    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 });
    }

    ipRateMap.set(ip, now);

    // Save report securely in Firestore
    await adminDb.collection('securityEvents').add({
      type: 'ABUSE_REPORT',
      category: category || 'general',
      description: description.substring(0, 2000), // sanitize max length
      contactEmail: contactEmail ? contactEmail.substring(0, 200) : null,
      reporterIp: ip,
      timestamp: new Date().toISOString(),
      status: 'PENDING_REVIEW'
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Report abuse submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
