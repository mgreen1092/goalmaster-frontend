import React from 'react'
import './EditGoal.css'
import { IoIosCloseCircle } from 'react-icons/io'

export default function EditGoal ({goals, editGoalModal, setEditGoalModal, updatedGoal, selectedGoal, handleEdit, editGoal, handleSubmit}) {
    return (
        <div>
            {selectedGoal &&
            <div className='add-goal' style={{ display: editGoalModal ? 'flex' : 'none' }} >
                <form className='add-goal-form' style={{ position: 'relative' }} onSubmit={handleSubmit} >
                    <IoIosCloseCircle style={{ color: 'teal', fontSize: '2em', position: 'absolute', right: '1em', cursor: 'pointer' }} onClick={() => setEditGoalModal(false)} />
                    <h1>Edit Goal</h1>
                    <p>Goal</p>
                    <input hidden readOnly name='id' value={selectedGoal._id}></input>
                    <input className='name-input' placeholder='Goal' name='goal' value={updatedGoal.goal} onChange={handleEdit}></input>
                    <p>Goal Description</p>
                    <input className='description-input' placeholder='Description' name='description' value={updatedGoal.description} onChange={handleEdit}></input>
                    <p>Quantify Your Goal</p>
                    <input className='value-input' placeholder='Number' name='goalvalue' value={updatedGoal.goalvalue} onChange={handleEdit}></input>
                    <p>How often will you complete this goal?</p>
                    <select name='occurence' onChange={handleEdit}>
                        <option value='daily'>Daily</option>
                        <option value='weekly'>Weekly</option>
                        <option value='monthly'>Monthly</option>
                        <option value='quarterly'>Quarterly</option>
                        <option value='biannually'>Biannually</option>
                        <option value='yearly'>Yearly</option>
                    </select>
                    <button className='add-to-goals-button' type='submit'>Update Goal</button>
                </form>
        </div> }
        </div>
    )}