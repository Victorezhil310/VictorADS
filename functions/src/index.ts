import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// 1. User Creation Cloud Function: Initializes secure profile document with default role & financial attributes
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const email = user.email || '';

  // Write safe server-initialized user profile
  await admin.firestore().collection('users').doc(uid).set({
    uid,
    email,
    role: 'USER',
    isSubscribed: false,
    hasRemovedAds: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // Log Security Event
  await admin.firestore().collection('auditLogs').add({
    event: 'USER_REGISTRATION',
    uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
});

// 2. Server-side Callable Security & Entitlement Verification Function
export const verifyEntitlements = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Request requires authentication.');
  }

  const uid = context.auth.uid;
  const userDoc = await admin.firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User record not found.');
  }

  const userData = userDoc.data();
  return {
    uid,
    hasRemovedAds: userData?.hasRemovedAds || false,
    subscriptionStatus: userData?.subscriptionStatus || 'INACTIVE',
    role: userData?.role || 'USER'
  };
});
