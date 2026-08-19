import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('SERVER ERROR: RAZORPAY_WEBHOOK_SECRET is missing in environment variables.');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature || !verifyRazorpaySignature(rawBody, signature, secret)) {
      console.warn('SECURITY ALERT: Invalid Razorpay webhook signature attempted.');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const eventId = req.headers.get('x-razorpay-event-id') || `${payload.event}_${Date.now()}`;

    // 1. Idempotency Check: Prevent duplicate event processing
    const auditDocRef = adminDb.collection('auditLogs').doc(`event_${eventId}`);
    const existingEvent = await auditDocRef.get();
    if (existingEvent.exists) {
      return NextResponse.json({ message: 'Event already processed' }, { status: 200 });
    }

    // 2. Event Handling
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload.payment?.entity;
      const userId = paymentEntity?.notes?.userId;
      const amount = (paymentEntity?.amount || 0) / 100;

      if (userId) {
        // Update user entitlement & payment status securely on server
        await adminDb.collection('users').doc(userId).set(
          {
            paymentStatus: 'PAID',
            subscriptionStatus: 'ACTIVE',
            hasRemovedAds: true, // Entitlement granted
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );

        // Record financial ledger entry
        await adminDb.collection('payments').doc(paymentEntity.id).set({
          paymentId: paymentEntity.id,
          orderId: paymentEntity.order_id,
          userId,
          amount,
          currency: paymentEntity.currency,
          status: paymentEntity.status,
          timestamp: new Date().toISOString()
        });
      }
    }

    // 3. Log Audit Event
    await auditDocRef.set({
      eventId,
      event,
      timestamp: new Date().toISOString(),
      status: 'PROCESSED'
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
