import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();

export default admin;
