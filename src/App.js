import './App.css';
import MainPage from './Components/MainPage/MainPage.js';
import { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup  } from 'firebase/auth'
import GoalDetails from './Components/MainPage/GoalDetails.js';
import { Route, Routes } from 'react-router'
import axios from 'axios'
import AddGoal from './Components/MainPage/AddGoal/AddGoal';

function App() {
  const [userAuth, setUserAuth] = useState(false || window.localStorage.getItem('auth')==='true')
  const [user, setUser] = useState()
  const [token, setToken] = useState('')
  const googleProvider=new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const gitHubProvider = new GithubAuthProvider()
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      console.log(response, 'RESPONSE')
      if (response) {
        // console.log(auth.currentUser, 'CURRENT USER')
        setUserAuth(true)
        window.localStorage.setItem('auth', 'true')
        response.getIdToken().then((token) => {
          console.log(token, 'TOKEN')
          setToken(token)
        })
      }
    }) 
  })

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
        console.log(result, '+++++++++++')
        // console.log(auth.currentUser, 'CURRENT USER')
        // setUser(result)
        if (result) {
          setUserAuth(true)
          window.localStorage.setItem('auth', 'true')
        //   let userData
        //   userAuth===true
        //   ? userData = axios.get(`https://goalmaster.herokuapp.com/api/users/${user}`, {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }})
        //   : userData = axios.post('https://goalmaster.herokuapp.com/api/users/', {
        //     email: email,
        //     goals: []
        //   }, {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }})

        }
        let userData
        userAuth
        ? userData = axios.get(`https://goalmaster.herokuapp.com/api/users/${user}`, {
          headers: {
              'Authorization': 'Bearer ' + token
          }})
        : userData = axios.post('https://goalmaster.herokuapp.com/api/users/', {
          email: email,
          goals: []
        }, {
          headers: {
              'Authorization': 'Bearer ' + token
          }})
        const name = result.user.displayName
        const email = result.user.email
        console.log(email)
        setUser(email)
        // let userData
        const profilePic = result.user.photoURL

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', profilePic)

    }).catch((error) => {
        console.log(error)
    });
  }
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
        console.log(result)
        if (result) {
          setUserAuth(true)
          window.localStorage.setItem('auth', 'true')
        }
    }).catch((error)=> {
        console.log(error.message)
    })
  }
  const signInWithGitHub = () => {
    signInWithPopup(auth, gitHubProvider).then((result) => {
        console.log(result)
        if (result) {
          setUserAuth(true)
          window.localStorage.setItem('auth', 'true')
        }
    }).catch((error)=> {
        console.log(error.message)
    })
  }
  const logoutUser = () => {
    signOut(auth).then(() => {
        console.log('SIGN OUT SUCCESS')
        setUserAuth(false)
        setUser('')
    }).catch((error) => {
        console.log(error)
    })
}
console.log(user, '-------------------')
  return (
    <div className="Nav">
      {/* <h1 className='title'>GOAL MASTER</h1> */}
      {userAuth ? (
        <MainPage logoutUser={logoutUser} user={user} token={token}/>
      ) : ( 
      <div className="App">
        <h1 className='title'>GOAL MASTER</h1>
      <div className = 'container'>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
        <button className='login-with-facebook' onClick={signInWithFacebook}>Sign in with Facebook</button>
        <button className='login-with-github' onClick={signInWithGitHub}>Sign in with GitHub </button>
    </div>
    </div>
    )}
    <Routes>
      <Route path='goals/:id' element={<GoalDetails />} />
      <Route path='/home' element={<MainPage />} />
      <Route path='/addGoal' element={<AddGoal />} />
    </Routes>
    </div>
    // </div>
  );
}

export default App;
