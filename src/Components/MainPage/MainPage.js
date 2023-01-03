import React from "react";
// import { useUserContext } from "../../FirebaseContext/userContext.js";
import '../MainPage/MainPage.css'
// import {Link} from 'react'
// import { IoIosAddCircle, IoIosHome } from 'react-icons/io'
import Goals from './Goals/Goals.js'
// import axios from 'axios'
import { useState } from 'react'

export default function MainPage ({logoutUser}) {
    // const updatedUser = await axios.get()
    const [goals, setGoals] = useState()
    // const { user, logoutUser } = useUserContext()

    return (
        <div>
            <div>
                <h2>Welcome</h2>
                <button onClick={logoutUser}>Logout</button>
            </div>
            <div className='goals'>
                <Goals goals={goals} setGoals={setGoals}/>
			</div>
		</div>
    )
}