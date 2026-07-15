import { getApps, initializeApp } from "firebase/app";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbMkxPv-wkRY0EWUNXPfeOw_ew27O73V8",

  authDomain: "walking-buddy-bf642.firebaseapp.com",

  projectId: "walking-buddy-bf642",

  storageBucket: "walking-buddy-bf642.firebasestorage.app",

  messagingSenderId: "58347477505",

  appId: "1:58347477505:web:bdfb7a0780dd3f74c9fe00",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/* AUTH */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/* FIRESTORE */
export const db = getFirestore(app);
