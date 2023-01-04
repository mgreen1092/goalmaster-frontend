import React from "react";
import '../MainPage/MainPage.css'
import Goals from './Goals/Goals.js'
import { useState } from 'react'
import { IoIosHome } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function MainPage ({logoutUser, token, user}) {
    const [goals, setGoals] = useState()

    return (
        <div>
            <div className='nav'>
                <h2>Welcome {user} </h2>
                <Link to='/home'><div className='nav-home'>
                    <IoIosHome style={{color: 'black', fontSize: '1.3em'}}/>
                </div></Link>
            </div>
            <div>
                {/* <h2>Welcome {user} </h2> */}
            </div>
            <div className='App'>
                <Goals user={user} token={token} goals={goals} setGoals={setGoals}/>
                <button className='logout-button' onClick={logoutUser}>Logout</button>
            </div>
		</div>
    )
}