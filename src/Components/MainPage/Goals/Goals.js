import React, { useEffect } from "react";
import '../Goals/Goals.css'
import axios from 'axios'
import { useState } from 'react'
import AddGoal from '../AddGoal/AddGoal.js'
import { Link } from 'react-router-dom'
import '../Goals/Goals.css'
import { TbPencil, TbTrash} from 'react-icons/tb'
import EditGoal from "../../EditGoal/EditGoal.js";

export default function Goals ({goals, setGoals, user, setUser, token}) {
    const [addGoalModal, setAddGoalModal] = useState(false)
    const [editGoalModal, setEditGoalModal] = useState(false)
    const [addGoal, setAddGoal] = useState(
        {
            goal: '',
            description: '',
            goalvalue: '',
            occurence: '',
        }
    )
    // const [editGoalInput, setEditGoalInput] = useState(
    //     {
    //         goal: '',
    //         description: '',
    //         goalvalue: '',
    //         occurence: '',
    //     }
    // )
    useEffect(() => {
        if(token) {
            getGoals(token)
        }
    }, [token])

    useEffect(() => {
        let refreshUser
        if (sessionStorage.getItem('user') !== 'undefined' || undefined) refreshUser = JSON.parse(sessionStorage.getItem('user'))
        refreshUser && setUser(refreshUser)
      }, [])

    const url='https://goalmaster.herokuapp.com'
    const getGoals = async (token) => {
        console.log(token, 'GOAL TOKEN')
        const urlPath = `${url}/users/${user}`
        console.log(urlPath)
        let userGoals = await axios.get(`${url}/api/goals/`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(userGoals.data.goals)
        setGoals(userGoals.data.goals)
    }
    const handleChange = (e) => {
        setAddGoal({...addGoal, [e.target.name]: e.target.value })
    }
    const addGoalToUser = async (e) => {
        e.preventDefault()
        try {
            const goalToAdd = axios.post('https://goalmaster.herokuapp.com/api/goals',
              {addGoal}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
        }catch (err) {
            console.log(err);
          }
          setAddGoal({
            goal: '',
            description: '',
            goalvalue: '',
            occurence: '',
          })
          setAddGoalModal(false)
        getGoals(token)
    }
    const deleteGoal = async (goalId) => {
        console.log(goalId)
        await axios.delete(`https://goalmaster.herokuapp.com/api/goals/${goalId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
        getGoals(token)
    }
    const editGoal = async (goalId) => {
        console.log(goalId)
        await axios.put(`https://goalmaster.herokuapp.com/api/goals/${goalId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
        setEditGoalModal(false)
        getGoals(token)
    }
    const handleEdit = async (e) => {
        setAddGoal({...addGoal, [e.target.name]: e.target.value })
    }
    return (
        <div >
            <div className='goal-list'>
                {goals?.map((goal, index) => 
                <div key={index} className='goal-goal'>
                    <Link to={'goals/' + goal._id}>{goal.goal}</Link><TbTrash className='delete button' style={{ fontSize: '1em', color: 'teal' }} onClick={() => deleteGoal(goal._id)} />
                    <p>Description: {goal.description}</p>
                    <p>Value: {goal.goalvalue}{goal.time}</p>
                    <p>To be completed: {goal.occurence}</p>
                    <TbPencil style={{ fontSize: '1em', color: 'black' }} className='goal-edit-button' onClick={() => {setEditGoalModal(true); editGoal(goal._id)}}/>
                </div>)}
            </div>
            <button onClick={() => setAddGoalModal(true)}>New Goal</button>
            <AddGoal addGoal={addGoal} setAddGoal={setAddGoal} handleChange={handleChange} addGoalToUser={addGoalToUser} addGoalModal={addGoalModal} setAddGoalModal={setAddGoalModal} token={token}/>
            <EditGoal handleEdit={handleEdit} editGoal={editGoal} editGoalModal={editGoalModal} setEditGoalModal={setEditGoalModal} addGoal={addGoal} />
        </div>
        
    )
}