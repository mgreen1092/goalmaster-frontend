import React from "react";
import {useRef} from 'react'
import { useUserContext } from "../../FirebaseContext/userContext.js";

export default function SignIn () {
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const {signInUser, forgotPassword} = useUserContext()

    const onSubmit = (event) => {
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        if (email && password) signInUser(email, password)
    }

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value
        if (email) forgotPassword(email).then(() => emailRef.current.value = '')
    }

    return (
        <div className='form'>
            <form onSubmit={onSubmit}>
                <input placeholder='Email' type='email' ref={emailRef} />
                <input placeholder='Password' type='password' ref={passwordRef} />
                <button type='submit'>Sign In</button>
                <p onClick={forgotPasswordHandler}>Forgot Password?</p>
            </form>
        </div>
    )

}