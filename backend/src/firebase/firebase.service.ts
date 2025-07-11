import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      const serviceAccountKey = this.configService.get<string>(
        'FIREBASE_SERVICE_ACCOUNT_KEY',
      );

      if (serviceAccountKey) {
        // For production with service account key
        const serviceAccount = JSON.parse(serviceAccountKey) as string;
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } else {
        admin.initializeApp();
      }
    }

    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }

  async getUser(uid: string) {
    try {
      return await admin.auth().getUser(uid);
    } catch {
      throw new Error(`User not found: ${uid}`);
    }
  }
}
