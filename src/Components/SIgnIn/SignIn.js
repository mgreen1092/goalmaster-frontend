import React from "react";
import {useRef} from 'react'

export default function SignIn () {
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const onSubmit = (event) => {
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
    }

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value
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