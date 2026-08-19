import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy (CSP) designed for Firebase, AdSense/AdMob, Razorpay, & Google Analytics
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://*.googleapis.com https://checkout.razorpay.com https://pagead2.googlesyndication.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: blob: https://*.googleusercontent.com https://*.firebaseestorage.googleapis.com https://pagead2.googlesyndication.com https://img.razorpay.com;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.razorpay.com https://pagead2.googlesyndication.com https://www.google-analytics.com;
    frame-src 'self' https://*.firebaseapp.com https://api.razorpay.com https://googleads.g.doubleclick.net;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(self "https://api.razorpay.com")');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files (_next/static, favicon, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
