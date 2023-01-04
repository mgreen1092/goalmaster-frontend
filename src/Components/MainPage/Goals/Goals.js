import React, { useEffect } from "react";
import '../Goals/Goals.css'
import axios from 'axios'
import { useState } from 'react'
import AddGoal from '../AddGoal/AddGoal.js'
import { Link } from 'react-router-dom'

export default function Goals ({goals, setGoals, token}) {
    const [addGoalModal, setAddGoalModal] = useState(false)
    useEffect(() => {
        if(token) {
            getGoals(token)
        }
    }, [token])
    const getGoals = async (token) => {
        console.log(token, 'GOAL TOKEN')
        const userGoals = await axios.get('https://goalmaster.herokuapp.com/api/goals/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(userGoals.data)
        setGoals(userGoals.data)
    }
    console.log(goals)
    // const handleAddGoals = async () => {
    //     const newGoal = await axios.post('https://goalmaster.herokuapp.com/api/goals', {
    //         goal: 'My new goal:',
    //         description: '',
    //         goalvalue: null,
    //         occurence: '',
    //         tracker: []
    //     })
    //     await axios.put(`https://goalmaster.herokuapp.com/api/users/${user.email}/add`, {
    //         _id: newGoal.data._id
    //     })
    //     const updatedUser = await axios.get(`https://spotifly-backend-ga.herokuapp.com/api/users/${user.email}`)
    //     // setUser(updatedUser.data)
    //     }
    return (
        <div className='goal-list'>
            <div>
                {goals?.map((goal, index) => 
                <div key={index} className='goal-goal'>
                    <Link to={'goals/' + goal._id}>{goal.goal}</Link>
                    <p>{goal.description}</p>
                    <p>{goal.goalvalue}</p>
                    <p>{goal.occurence}</p>
                </div>)}
            </div>
            <button onClick={() => setAddGoalModal(true)}>New Goal</button>
            <AddGoal addGoalModal={addGoalModal} />
        </div>
        
    )
}