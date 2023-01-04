import React, { useEffect } from "react";
import '../Goals/Goals.css'
import axios from 'axios'
import { useState } from 'react'
import AddGoal from '../AddGoal/AddGoal.js'
import { Link } from 'react-router-dom'
import '../Goals/Goals.css'
import { TbPencil } from 'react-icons/tb'

export default function Goals ({goals, setGoals, user, token}) {
    const [addGoalModal, setAddGoalModal] = useState(false)
    useEffect(() => {
        if(token) {
            getGoals(token)
        }
    }, [token])
    const getGoals = async (token) => {
        console.log(token, 'GOAL TOKEN')
        const userGoals = await axios.get(`https://goalmaster.herokuapp.com/api/users/${user}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(userGoals)
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
        <div >
            <div className='goal-list'>
                {goals?.map((goal, index) => 
                <div key={index} className='goal-goal'>
                    <Link to={'goals/' + goal._id}>{goal.goal}</Link>
                    <p>Description: {goal.description}</p>
                    <p>Value: {goal.goalvalue}{goal.time}</p>
                    <p>To be completed: {goal.occurence}</p>
                    <TbPencil style={{ fontSize: '1em', color: '#1BD760' }} className='goal-edit-button' />
                </div>)}
            </div>
            <button onClick={() => setAddGoalModal(true)}>New Goal</button>
            <AddGoal addGoalModal={addGoalModal} />
        </div>
        
    )
}