import './App.css';
import { signInWithGoogle, signInWithFacebook } from './config/firebase-config.js';
// import {useState} from 'react'
import { useUserContext } from './FirebaseContext/userContext.js';
import MainPage from './Components/MainPage/MainPage.js';
import Auth from './Components/Auth/Auth.js';

function App() {
  // const [user, setUser] = useState('')
  // const [goal, setGoal] = useState({})
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [loggingIn, setLoggingIn] = useState('')
  const {loading, error, user} = useUserContext()
  return (
    <div className="App">
      <h1>GOAL MASTER</h1>
      <button className='login-with-google-btn'onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={(signInWithFacebook)}>Sign in with Facebook</button>
      {error && <p className='error'>{error}</p>}
      {loading ? <h2>Loading....</h2> : <>{user ? <MainPage /> : <Auth />}</>}
    </div>
  );
}

export default App;
