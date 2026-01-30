'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // In a production environment (like Firebase App Hosting), initializeApp()
  // can be called without arguments to automatically use the reserved URL.
  // In development, we'll use the local config to avoid a "Failed to fetch"
  // error in the console if the reserved URL isn't available.
  // Use explicit config for initialization to avoid "no-options" errors
  // during local builds or environments where automatic hosting-based
  // initialization isn't available.
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
