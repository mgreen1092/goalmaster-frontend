import './App.css';
import { signInWithGoogle } from './config/firebase-config.js';
import {useState} from 'react'

function App() {
  // const [user, setUser] = useState('')
  // const [goal, setGoal] = useState({})
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [loggingIn, setLoggingIn] = useState('')
  return (
    <div className="App">
      <h1>GOAL MASTER</h1>
      <button className='login-with-google-btn'onClick={signInWithGoogle}>Google Sign In</button>
    </div>
  );
}

export default App;
