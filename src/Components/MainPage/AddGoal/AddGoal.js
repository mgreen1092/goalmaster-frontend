import React from "react";
import '../AddGoal/AddGoal.css'
import { useState } from 'react'

export default function AddGoal () {
    const [addGoal, setAddGoal] = useState(
        {
            goal: '',
            description: '',
            goalvalue: '',
            occurence: '',
        }
    )
    // const [allGoals, setAllGoals] = useState([])
    const addGoals = async (e) => {
        e.preventDefault()
        // try {
            // const goalToAdd = //axios post request
        // }
    }
    return (
        <div>
            {/* <div className='add-song' style={{ display: addSongModal ? 'flex' : 'none' }} >
                <form className='add-song-form' style={{ position: 'relative' }} >
                    <IoIosCloseCircle style={{ color: '#1BD760', fontSize: '2em', position: 'absolute', right: '1em', cursor: 'pointer' }} onClick={() => setAddSongModal(false)} />
                    <h1>Add a New Goal</h1>
                    <p>Goal</p>
                    <input className='name-input' placeholder='Song Title' name='name' value={addSong.name} onChange={handleChange}></input>
                    <p>Goal Description</p>
                    <input className='artist-input' placeholder='Artist' name='artist' value={addSong.artist} onChange={handleChange}></input>
                    <p>Quantify Your Goal</p>
                    <input className='album-input' placeholder='Album Title' name='album' value={addSong.album} onChange={handleChange}></input>
                    <p>occurence</p>
                    <select name='playlistSelect' onChange={handleChange}>
                        <option value='0'>Daily</option>
                        <option value='1'>Weekly</option>
                        <option value='2'>Monthly</option>
                        <option value='3'>Quarterly</option>
                        <option value='4'>Biannually</option>
                        <option value='5'>Yearly</option>
                    </select>
                    <button className='add-to-playlist-button' onClick={addSongToPlaylist} >Add Goal</button>
                </form>
        </div> */}
        </div>
    )}