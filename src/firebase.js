import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sneackersshopreact.firebaseapp.com",
  projectId: "sneackersshopreact",
  storageBucket: "sneackersshopreact.firebasestorage.app",
  messagingSenderId: "103467750745",
  appId: "1:103467750745:web:09a3f02d94495804542848",
  measurementId: "G-WT56K613DX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
