import { createContext, useEffect } from "react";
import {createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import {auth} from '../config'
import { useState } from 'react';


const UserContext = createContext({})



export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState()
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, response => {
            // if the user is not logged in or not registers, setUser remains at null
            response ? setUser(response) : setUser(null)
            setError('')
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const registerUser = (email, password, name) => {
        setLoading(true);
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

    const signInUser = () => {
        setLoading(true)
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

    const contextValue = {
        user,
        loading, 
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword
    };
    return (
        <div>
            <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
        </div>
    )
}