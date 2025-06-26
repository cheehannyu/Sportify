import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDNYtNHT7ac-Oliv56U57PjrfxMq2QJ6s",
  authDomain: "sportify-b75be.firebaseapp.com",
  projectId: "sportify-b75be",
  storageBucket: "sportify-b75be.firebasestorage.app",
  messagingSenderId: "426208198549",
  appId: "1:426208198549:web:ddf3daba3ff9828418809c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
