import * as admin from "firebase-admin";

function formatPrivateKey(key: string | undefined) {
  if (!key) return undefined;
  
  const strippedKey = key.replace(/^["']|["']$/g, '');
  
  return strippedKey.replace(/\\n/g, '\n');
}

function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const adminApp = getFirebaseAdmin();

export const db = adminApp ? adminApp.firestore() : (null as any);