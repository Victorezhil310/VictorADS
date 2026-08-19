import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized. Missing auth token.' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);

    // Verify OWNER / ADMIN custom claim or email role
    const isAuthorized = decoded.admin === true || decoded.role === 'ADMIN' || decoded.role === 'OWNER';

    if (!isAuthorized) {
      console.warn(`SECURITY WARNING: Unauthorized admin API access attempt by user: ${decoded.uid}`);
      return NextResponse.json({ error: 'Forbidden. Owner/Admin privilege required.' }, { status: 403 });
    }

    // Fetch audit logs
    const snapshot = await adminDb.collection('auditLogs').orderBy('timestamp', 'desc').limit(50).get();
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
