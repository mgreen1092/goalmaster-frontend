import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
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
const auth = getAuth(app);
const storage = getStorage(app);
// const googleProvider=new GoogleAuthProvider()
// const facebookProvider = new FacebookAuthProvider()
// const gitHubProvider = new GithubAuthProvider()

// const signInWithGoogle = () => {
//     signInWithPopup(auth, googleProvider).then((result) => {
//         console.log(result)
//         const name = result.user.displayName
//         const email = result.user.email
//         const profilePic = result.user.photoURL

//         localStorage.setItem('name', name);
//         localStorage.setItem('email', email);
//         localStorage.setItem('profilePic', profilePic)

//     }).catch((error) => {
//         console.log(error)
//     });
// }

// const signInWithFacebook = () => {
//     signInWithPopup(auth, facebookProvider).then((result) => {
//         console.log(result)
//     }).catch((error)=> {
//         console.log(error.message)
//     })
// }

// const signInWithGitHub = () => {
//     signInWithPopup(auth, gitHubProvider).then((result) => {
//         console.log(result)
//     }).catch((error)=> {
//         console.log(error.message)
//     })
// }

export { db, auth, storage };