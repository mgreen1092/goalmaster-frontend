import React from "react";
import { useState } from 'react'
import SignIn from "../SIgnIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";
// import { signInWithGoogle, signInWithFacebook, signInWithGitHub } from '../../FirebaseContext/userContext.js'
import { useUserContext } from '../../FirebaseContext/userContext.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' 

export default function Auth () {
    const [index, setIndex] = useState(false)
    const toggleIndex = () => {
        setIndex((prevState) => !prevState)
    }
    const { signInWithGoogle, signInWithFacebook, signInWithGitHub} = useUserContext()
    return (
        <div className = 'container'>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
            <button className='login-with-facebook' onClick={signInWithFacebook}>Sign in with Facebook</button>
            <button className='login-with-github' onClick={signInWithGitHub}>Sign in with GitHub </button>
            <div className="separator">
                <p>OR</p>
            </div>
            {!index ? <SignIn /> : <SignUp />}
            {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
            <p onClick={toggleIndex}>
                {!index ? 'New user? Click here' : 'Already have an account?'}
            </p>
        </div>
    )
}