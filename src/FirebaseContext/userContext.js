import { createContext, useContext, useState } from "react";
import {createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, 
    GithubAuthProvider, signInWithPopup  } from 'firebase/auth'
import { auth } from '../config/firebase-config.js'
import axios from 'axios'


const UserContext = createContext({})

export const useUserContext = () => {
    return useContext(UserContext)
}
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState('')
    

    useState( () => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (response) => {
            console.log(auth, 'AUTH')
            if (response) {
            setUser(response)
            console.log(response)
            // let userData
            // if (userData === axios.get(`https://goalmaster.herokuapp.com/api/users/${response.email}`)) {
            //     setUser(response)
            // } else if (user === axios.post('https://goalmaster.herokuapp.com/api/users/', {
            //     email: user.email,
            //     goals:[]
            // })) {
            //     setUser(response)
            // }
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
        createUserWithEmailAndPassword(auth, email, password)
            .then(()=> {
                updateProfile(auth.currentUser, {
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
                setError(error.code)
            }).finally(()=> {
                setLoading(false)
            })
    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            console.log('SIGN OUT SUCCESS')
        }).catch((error) => {
            console.log(error)
        })
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