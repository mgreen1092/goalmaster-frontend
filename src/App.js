import './App.css';
import { signInWithGoogle, signInWithFacebook } from './config/firebase-config.js';
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
      <button className='login-with-google-btn'onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={(signInWithFacebook)}>Sign in with Facebook</button>
    </div>
  );
}

export default App;
