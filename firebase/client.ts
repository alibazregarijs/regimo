import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMo65TcDjrsbBgoTmUTJSL8bKn26zsEXA",
  authDomain: "regimo-e464f.firebaseapp.com",
  projectId: "regimo-e464f",
  storageBucket: "regimo-e464f.firebasestorage.app",
  messagingSenderId: "40983679635",
  appId: "1:40983679635:web:ebdd04f02619b48ee8f366",
  measurementId: "G-TVLC4174VD",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
