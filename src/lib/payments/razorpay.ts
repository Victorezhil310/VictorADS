import crypto from 'crypto';

export interface PaymentWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: {
        id: string;
        order_id: string;
        amount: number;
        currency: string;
        status: string;
        notes?: {
          userId?: string;
          planId?: string;
        };
      };
    };
    subscription?: {
      entity: {
        id: string;
        status: string;
        customer_id?: string;
      };
    };
  };
}

/**
 * Verifies Razorpay Webhook HMAC SHA256 Signature
 * NEVER TRUST CLIENT PAYMENT STATUS. ALL REVENUE / PAYMENT UPDATES MUST PASS HMAC SIGNATURE VERIFICATION.
 */
export function verifyRazorpaySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret || !rawBody) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );
  } catch (err) {
    console.error('Error verifying Razorpay HMAC signature:', err);
    return false;
  }
}

/**
 * Verifies Razorpay Payment Order Signature (Client Checkout Completion Verification)
 */
export function verifyPaymentOrderSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  if (!orderId || !paymentId || !signature || !secret) {
    return false;
  }

  try {
    const text = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );
  } catch (err) {
    console.error('Error verifying payment order signature:', err);
    return false;
  }
}
