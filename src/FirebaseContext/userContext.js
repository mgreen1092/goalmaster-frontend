import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, 
    GithubAuthProvider, signInWithPopup  } from 'firebase/auth'
import { auth } from '../config/firebase-config.js'
// import { GoogleAuthProvider, FacebookAuthProvider, 
    // GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState()
    const [error, setError] = useState('')
    
    useState(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res) => {
          if (res) {
            setUser(res);
          } else {
            setUser(null);
          }
          setError("");
          setLoading(false);
        });
        return unsubscribe;
      }, []);

    const registerUser = (email, password, name) => {
        setLoading(true);
        setError('')
        createUserWithEmailAndPassword(auth, email, password).then(()=> {
            return updateProfile(auth.currentUser, {
                displayName: name,
            })
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError(error.message)
        }).finally(()=> {
            setLoading(false)
        })
    }

    const signInUser = (email, password) => {
        setLoading(true)
        setError('')
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                setError(error.message)
            }).finally(()=> {
                setLoading(false)
            })
    }

    const logoutUser = () => {
        signOut(auth)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        setError('')
        const googleProvider=new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        }).finally(()=> {
            setLoading(false)
        });
    } 

    const signInWithFacebook = () => {
        setLoading(true)
        setError('')
        const facebookProvider = new FacebookAuthProvider()
        signInWithPopup(auth, facebookProvider).then((result) => {
            console.log(result)
        }).catch((error)=> {
            console.log(error.message)
        }).finally(()=> {
            setLoading(false)
        })
    }

    const signInWithGitHub = () => {
        setLoading(true)
        setError('')
        const gitHubProvider = new GithubAuthProvider()
        signInWithPopup(auth, gitHubProvider).then((result) => {
            console.log(result)
        }).catch((error)=> {
            console.log(error.message)
        }).finally(()=> {
            setLoading(false)
        })
    }


    const contextValue = {
        user,
        loading,
        error,
        signInUser,
        registerUser,
        logoutUser,
        forgotPassword,
        signInWithGoogle,
        signInWithGitHub,
        signInWithFacebook
    };
    return (
        <div>
            <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
        </div>
    )
}