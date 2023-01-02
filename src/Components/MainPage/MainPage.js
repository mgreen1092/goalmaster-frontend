import React from "react";
import { useUserContext } from "../../FirebaseContext/userContext.js";
import '../MainPage/MainPage.css'
import {Link} from 'react'
import { IoIosAddCircle, IoIosHome } from 'react-icons/io'
import Goals from './Goals/Goals.js'
import axios from 'axios'
import { setUISelectionRaw } from "@testing-library/user-event/dist/types/document/UI.js";
import { useNavigate } from 'react-router-dom';

export default function MainPage () {
    // const updatedUser = await axios.get()
    const { user, logoutUser } = useUserContext()
    const navigate = useNavigate()
    const handleAddGoals = async () => {
        const newGoal = await axios.post('https://goalmaster.herokuapp.com/api/goals', {
        goal: 'My new goal:',
        description: '',
        goalvalue: null,
        occurence: '',
        tracker: []
        })
        await axios.put(`https://goalmaster.herokuapp.com/api/users/${user.email}/add`, {
            _id: newGoal.data._id
        })
    const updatedUser = await axios.get(`https://spotifly-backend-ga.herokuapp.com/api/users/${user.email}`)
    // setUser(updatedUser.data)
    }
    return (
        <div>
            <div>
                <h2>Welcome {user.displayName}</h2>
                <button onClick={logoutUser}>Logout</button>
            </div>
            <div className='nav'>
			<Link to='/home'><div className='nav-home'>
				<IoIosHome style={{color: 'white', fontSize: '1.3em'}}/>
				<p>Home</p>
			</div></Link>
			<div className='nav-goals'>
				<p>Goals</p>
				<IoIosAddCircle className='add-goals-button' style={{ fontSize: '1.3em', cursor: 'pointer', color: '#1BD760' }} onClick={handleAddGoals} />
			</div>
			<Goals user={user} />
			<button onClick={logoutUser}>Log Out</button>
		</div>
        </div>
    )
}