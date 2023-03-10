import React, { useEffect } from "react";
import '../Goals/Goals.css'
import axios from 'axios'
import { useState } from 'react'
import AddGoal from '../AddGoal/AddGoal.js'
import { Link } from 'react-router-dom'
import '../Goals/Goals.css'
import { TbPencil, TbTrash} from 'react-icons/tb'
import EditGoal from "../../EditGoal/EditGoal.js";

export default function Goals ({goals, setGoals, selectGoal, selectedGoal, setUser, token}) {
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
        addGoalToUser()
        if(token) {
            getGoals(token)
        }
    }, [token, addGoal])

    const url='https://goalmaster.herokuapp.com'
    const getGoals = async (token) => {
        let userGoals = await axios.get(`${url}/api/goals/`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        setUser(userGoals.data.email)
        setGoals([...userGoals.data.goals])
    }
    const handleChange = (e) => {
        setAddGoal({...addGoal, [e.target.name]: e.target.value })
    }
    const addGoalToUser = async (e) => {
        e.preventDefault()
        try {
            axios.post('https://goalmaster.herokuapp.com/api/goals',
              {addGoal}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => {
                    setGoals([...goals, res.data])
                })
                console.log('hi')
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
        console.log('REACHING getGoals')
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
        getGoals(token)
    }
    const handleEdit = async (e) => {
        setUpdatedGoal({
            ...updatedGoal, [e.target.name]: e.target.value
        })
        console.log(updatedGoal)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setEditGoalModal(false)
        editGoal(e.target.id.value)
    }
    return (
        <div className='goals-container'>
            <div className='split left'>
                {goals?.map((goal, index) => 
                <div key={index} className='goal-goal'>
                    <div className='goal-header'>
                        <Link to={'goals/' + goal._id}>{goal.goal}</Link>
                        <TbPencil style={{ fontSize: '1em', color: 'black' }} className='goal-edit-button' onClick={() => {setEditGoalModal(true); selectGoal(goal)}}/>
                    </div>
                    <p>Description: {goal.description}</p>
                    <p>Value: {goal.goalvalue}{goal.time}</p>
                    <div className='goal-header'>
                        <p>To be completed: {goal.occurence}</p>
                        <TbTrash className='delete-button' style={{ fontSize: '1em', color: '#042C47' }} onClick={() => deleteGoal(goal._id)} />
                    </div>
                </div>)}
                <button onClick={() => setAddGoalModal(true)} className='new-goal'>New Goal</button>
            </div>
            <div className='split right'>
                <img src="https://amplifieddigitalagency.com/wp-content/uploads/SMARTS-Goals-Blog-Graphic-1-533x800.png" alt='Goals' className='goals-image' />
            </div>
            <AddGoal addGoal={addGoal} setAddGoal={setAddGoal} handleChange={handleChange} addGoalToUser={addGoalToUser} addGoalModal={addGoalModal} setAddGoalModal={setAddGoalModal} token={token} />
            <EditGoal handleSubmit={handleSubmit} goals={goals} selectedGoal={selectedGoal} updatedGoal={updatedGoal} handleEdit={handleEdit} editGoal={editGoal} editGoalModal={editGoalModal} setEditGoalModal={setEditGoalModal} addGoal={addGoal} />
        </div>
        
    )
}