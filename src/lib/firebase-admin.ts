import * as admin from 'firebase-admin';
import { Application } from '../declarations';
import * as config from "../service.json"

export const initializeFirebaseAdmin = (app: Application) => {
  const firebaseConfig = config as admin.ServiceAccount;

  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  } catch (e) {
    console.log('erorr initializing firebase', e);
  }
};
