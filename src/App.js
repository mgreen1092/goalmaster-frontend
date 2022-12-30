import './App.css';
import {useState} from 'react'

function App() {
  const [user, setUser] = useState('')
  const [goal, setGoal] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState('')
  return (
    <div className="App">
      <h1>GOAL MASTER</h1>
      <button>Google Sign In</button>
    </div>
  );
}

export default App;
