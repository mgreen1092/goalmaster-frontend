import React, { useEffect } from "react";
import '../Goals/Goals.css'
import axios from 'axios'
import { useState } from 'react'
import AddGoal from '../AddGoal/AddGoal.js'
import { Link } from 'react-router-dom'
import '../Goals/Goals.css'
import { TbPencil, TbTrash} from 'react-icons/tb'
import EditGoal from "../../EditGoal/EditGoal.js";

export default function Goals ({goals, setGoals, selectGoal, selectedGoal, user, setUser, token}) {
    const [addGoalModal, setAddGoalModal] = useState(false)
    const [editGoalModal, setEditGoalModal] = useState(false)
    const [updatedGoal, setUpdatedGoal] = useState({})
    const [addGoal, setAddGoal] = useState(
        {
            goal: '',
            description: '',
            goalvalue: '',
            occurence: '',
        }
    )
    useEffect(() => {
        if(token) {
            getGoals(token)
        }
    }, [token])
    console.log(goals)

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
        console.log(userGoals.data)
        setUser(userGoals.data.email)
        console.log(user, 'GOALS USER')
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
    const editGoal = async (selectedId) => {
        console.log(updatedGoal, '====================')
        console.log(selectedGoal._id)
        console.log(selectedId)
        try {
            const data = await axios.put(`https://goalmaster.herokuapp.com/api/goals/${selectedId}`, {
                    goal: updatedGoal.goal,
                    description: updatedGoal.description,
                    goalvalue: updatedGoal.goalvalue,
                    occurence: updatedGoal.occurence
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }})
            let unchangedGoals = (goals.filter((goal) => goal._id !== selectedGoal._id))
            setGoals([data, ...unchangedGoals]);
          } catch (err) {
                console.log(err.message);
          }
        console.log(selectedId)
        console.log(updatedGoal.goal)
        getGoals(token)
        console.log('AXIOS CALL')
    }
    const handleEdit = async (e) => {
        setUpdatedGoal({
            ...updatedGoal, [e.target.name]: e.target.value
        })
        console.log(updatedGoal)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        setEditGoalModal(false)
        console.log(e.target.id.value)
        editGoal(e.target.id.value)
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
                    <TbPencil style={{ fontSize: '1em', color: 'black' }} className='goal-edit-button' onClick={() => {setEditGoalModal(true); selectGoal(goal)}}/>
                </div>)}
            </div>
            <button onClick={() => setAddGoalModal(true)}>New Goal</button>
            <AddGoal addGoal={addGoal} setAddGoal={setAddGoal} handleChange={handleChange} addGoalToUser={addGoalToUser} addGoalModal={addGoalModal} setAddGoalModal={setAddGoalModal} token={token}/>
            <EditGoal handleSubmit={handleSubmit} goals={goals} selectedGoal={selectedGoal} updatedGoal={updatedGoal} handleEdit={handleEdit} editGoal={editGoal} editGoalModal={editGoalModal} setEditGoalModal={setEditGoalModal} addGoal={addGoal} />
        </div>
        
    )
}