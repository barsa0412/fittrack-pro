import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIIKd6cEqazwaaHyHIm3_cbcDxGxRfdTg",
  authDomain: "fittrack-pro-bafe6.firebaseapp.com",
  projectId: "fittrack-pro-bafe6",
  storageBucket: "fittrack-pro-bafe6.firebasestorage.app",
  messagingSenderId: "432044638733",
  appId: "1:432044638733:web:650d77069d4f8fe5900b44",
  measurementId: "G-VH2F664SCB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);