import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "goalmaster-79ec8.firebaseapp.com",
  projectId: "goalmaster-79ec8",
  storageBucket: "goalmaster-79ec8.appspot.com",
  messagingSenderId: "697704121639",
  appId: "1:697704121639:web:146f06c335f5b8c3fc5502",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
//const provider=new GoogleAuthProvider()

export { db, auth, storage };