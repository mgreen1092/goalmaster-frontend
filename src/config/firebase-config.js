import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

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
const auth = getAuth();
const storage = getStorage(app);
const provider=new GoogleAuthProvider()

const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result)
        const name = result.user.displayName
        const email = result.user.email
        const profilePic = result.user.photoURL

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', profilePic)

    }).catch((error) => {
        console.log(error)
    });
}

export { db, auth, storage, signInWithGoogle };