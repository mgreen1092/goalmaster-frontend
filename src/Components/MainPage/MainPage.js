import React from "react";
import '../MainPage/MainPage.css'
import Goals from './Goals/Goals.js'
import { useState } from 'react'

export default function MainPage ({logoutUser, token}) {
    const [goals, setGoals] = useState()

    return (
        <div>
            <div>
                <h2>Welcome</h2>
                <button onClick={logoutUser}>Logout</button>
            </div>
            <div className='goals'>
                <Goals token={token} goals={goals} setGoals={setGoals}/>
			</div>
		</div>
    )
}