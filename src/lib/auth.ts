import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import User from '@/models/User';
import connectDB from './mongodb';

// Define the structure of the service account credentials
interface FirebaseServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// Check for Firebase environment variables
const hasFirebaseAdminConfig =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length && hasFirebaseAdminConfig) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key needs to be parsed correctly
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  } as FirebaseServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Define the type for a handler function that can be wrapped
type ApiHandler = (
  req: NextRequest,
  params: { [key: string]: any }
) => Promise<NextResponse>;

/**
 * A higher-order function to wrap API routes that require admin authentication.
 * It verifies the user's JWT, checks if their email matches the admin email, and then proceeds to the handler.
 *
 * @param handler The original API route handler.
 * @returns A new handler that includes the authentication and authorization logic.
 */
export function withAdminAuth(handler: ApiHandler): ApiHandler {
  return async (req, params) => {
    // Check if the Firebase Admin SDK was initialized
    if (!hasFirebaseAdminConfig) {
      console.error('Firebase Admin SDK not configured. Missing environment variables.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const authorization = req.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header is missing or invalid.' }, { status: 401 });
    }

    const token = authorization.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Bearer token is missing.' }, { status: 401 });
    }

    try {
      // Verify the token with Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      // Connect to the database to get user details
      await connectDB();
      const user = await User.findOne({ firebaseUid: uid });

      if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
      }

      if (!process.env.ADMIN_EMAIL) {
        console.error('ADMIN_EMAIL environment variable not set.');
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
      }

      if (user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 });
      }

      // If authentication and authorization are successful, proceed to the original handler
      return handler(req, params);
    } catch (error: any) {
      console.error('Authentication error:', error);
      let errorMessage = 'Authentication failed.';
      if (error.code === 'auth/id-token-expired') {
        errorMessage = 'Token has expired. Please log in again.';
      }
      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
  };
}
