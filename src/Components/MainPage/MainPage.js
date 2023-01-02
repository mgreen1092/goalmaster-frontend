import React from "react";
import { useUserContext } from "../../FirebaseContext/userContext.js";
import '../MainPage/MainPage.css'
// import axios from 'axios'

export default function MainPage () {
    // const updatedUser = await axios.get()
    const { user, logoutUser } = useUserContext()
    return (
        <div>
            <h2>Name: {user.displayName}</h2>
            <h2>Email: {user.email}</h2>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}