import React from "react";
import '../MainPage/MainPage.css'
import Goals from './Goals/Goals.js'
import { useState } from 'react'

export default function MainPage ({quote, logoutUser, token, user, setUser, name}) {
    const [goals, setGoals] = useState([])
    const [selectedGoal, setSelectedGoal] = useState('')

    function selectGoal(goal) {
        setSelectedGoal(goal)
        console.log(goal)
    }

    return (
        <div>
            <div className='nav'>
                <h2 className='welcome'>Welcome {user} </h2>
                <div className='nav-container'>
                    <div className='nav-home'>
                        {/* <IoIosHome className='home' style={{color: 'black', fontSize: '2.5em'}}/> */}
                        <button className='logout-button' onClick={logoutUser}>Logout</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div className='goals'>
                <p>{quote}</p>
                <Goals selectGoal={selectGoal} selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} user={user} setUser={setUser} token={token} goals={goals} setGoals={setGoals}/>
            </div>
		</div>
    )
}