import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// import { GoogleAuthProvider, FacebookAuthProvider, 
    // GithubAuthProvider, signInWithPopup  } from 'firebase/auth'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "goalmaster-79ec8.firebaseapp.com",
  projectId: "goalmaster-79ec8",
  storageBucket: "goalmaster-79ec8.appspot.com",
  messagingSenderId: "697704121639",
  appId: "1:697704121639:web:146f06c335f5b8c3fc5502",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };