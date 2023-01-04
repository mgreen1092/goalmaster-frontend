import React from "react";
import '../AddGoal/AddGoal.css'
import { useState } from 'react'
import axios from 'axios'
import { IoIosCloseCircle } from 'react-icons/io'

export default function AddGoal ({addGoalModal, setAddGoalModal, token}) {
    const [addGoal, setAddGoal] = useState(
        {
            goal: '',
            description: '',
            goalvalue: '',
            occurence: '',
        }
    )
    const handleChange = (e) => {
        const addedGoal = { ...addGoal }
        addedGoal[e.target.name] = e.target.value
        setAddGoal(addedGoal)
    }
    const addGoalToUser = async (e) => {
        e.preventDefault()
        try {
            const goalToAdd = axios.post('https://goalmaster.herokuapp.com/api/goals', 
                {
                    goal: '',
                    description: '',
                    goalvalue: '',
                    occurence: '',
                }, {
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
    }
    return (
        <div>
            <div className='add-goal' style={{ display: addGoalModal ? 'flex' : 'none' }} >
                <form className='add-goal-form' style={{ position: 'relative' }} >
                    <IoIosCloseCircle style={{ color: 'teal', fontSize: '2em', position: 'absolute', right: '1em', cursor: 'pointer' }} onClick={() => setAddGoalModal(false)} />
                    <h1>Add a New Goal</h1>
                    <p>Goal</p>
                    <input className='name-input' placeholder='Goal' name='name' value={addGoal.goal} onChange={handleChange}></input>
                    <p>Goal Description</p>
                    <input className='artist-input' placeholder='Description' name='artist' value={addGoal.description} onChange={handleChange}></input>
                    <p>Quantify Your Goal</p>
                    <input className='album-input' placeholder='Number' name='album' value={addGoal.goalvalue} onChange={handleChange}></input>
                    <p>How often will you complete this goal?</p>
                    <select name='occurenceSelect' onChange={handleChange}>
                        <option value='0'>Daily</option>
                        <option value='1'>Weekly</option>
                        <option value='2'>Monthly</option>
                        <option value='3'>Quarterly</option>
                        <option value='4'>Biannually</option>
                        <option value='5'>Yearly</option>
                    </select>
                    <button className='add-to-goals-button' onClick={addGoalToUser} >Add Goal</button>
                </form>
        </div>
        </div>
    )}