import React, { useEffect } from "react";
import '../AddGoal/AddGoal.css'
import { useState } from 'react'
import axios from 'axios'
import { IoIosCloseCircle } from 'react-icons/io'

export default function AddGoal ({addGoalModal, setAddGoalModal, token, addGoal, setAddGoal, handleChange, addGoalToUser}) {
    // const [addGoal, setAddGoal] = useState(
    //     {
    //         goal: '',
    //         description: '',
    //         goalvalue: '',
    //         occurence: '',
    //     }
    // )
    // useEffect(() => {
    //     const getAllGoals = async () => {
    //         const response = await axios.get('https://goalmaster.herokuapp.com/goals')
    //     }
    // })

    // const handleChange = (e) => {
    //     setAddGoal({...addGoal, [e.target.name]: e.target.value })
    // }
    // const addGoalToUser = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const goalToAdd = axios.post('https://goalmaster.herokuapp.com/api/goals',
    //           {addGoal}, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token
    //                 }
    //             })
    //     }catch (err) {
    //         console.log(err);
    //       }
    //       setAddGoal({
    //         goal: '',
    //         description: '',
    //         goalvalue: '',
    //         occurence: '',
    //       })
    //       setAddGoalModal(false)
    // }
    return (
        <div>
            <div className='add-goal' style={{ display: addGoalModal ? 'flex' : 'none' }} >
                <form className='add-goal-form' style={{ position: 'relative' }} >
                    <IoIosCloseCircle style={{ color: 'teal', fontSize: '2em', position: 'absolute', right: '1em', cursor: 'pointer' }} onClick={() => setAddGoalModal(false)} />
                    <h1>Add a New Goal</h1>
                    <p>Goal</p>
                    <input className='name-input' placeholder='Goal' name='goal' value={addGoal.goal} onChange={handleChange}></input>
                    <p>Goal Description</p>
                    <input className='artist-input' placeholder='Description' name='description' value={addGoal.description} onChange={handleChange}></input>
                    <p>Quantify Your Goal</p>
                    <input className='album-input' placeholder='Number' name='goalvalue' value={addGoal.goalvalue} onChange={handleChange}></input>
                    <p>How often will you complete this goal?</p>
                    <select name='occurence' onChange={handleChange}>
                        <option value='daily'>Daily</option>
                        <option value='weekly'>Weekly</option>
                        <option value='monthly'>Monthly</option>
                        <option value='quarterly'>Quarterly</option>
                        <option value='biannually'>Biannually</option>
                        <option value='yearly'>Yearly</option>
                    </select>
                    <button className='add-to-goals-button' onClick={addGoalToUser} >Add Goal</button>
                </form>
        </div>
        </div>
    )}