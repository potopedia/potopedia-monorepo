import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Firebase Admin SDK Configuration
 */

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  path.join(__dirname, '../../firebase-service-account.json');

// Check if service account file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Firebase service account file not found at:', serviceAccountPath);
  console.error('Please download the service account JSON from Firebase Console:');
  console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
  console.error('2. Click "Generate New Private Key"');
  console.error('3. Save the file as firebase-service-account.json in apps/api/');
  throw new Error('Firebase service account not found');
}

// Read service account
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, 'utf8')
);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'potopedia-6b5b4.firebasestorage.app'
  });

  console.log('✅ Firebase Admin initialized successfully');
  console.log(`📍 Project ID: ${serviceAccount.project_id}`);
}

export const auth = admin.auth();
export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;
