import './App.css';
import MainPage from './Components/MainPage/MainPage.js';
import { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup  } from 'firebase/auth'

function App() {
  // const [goals, setGoals] = useState()
  const [userAuth, setUserAuth] = useState(false)
  const [token, setToken] = useState('')
  const googleProvider=new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const gitHubProvider = new GithubAuthProvider()
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      console.log(response, 'RESPONSE')
      if (response) {
        setUserAuth(true)
        response.getIdToken().then((token) => {
          console.log(token, 'TOKEN')
          setToken(token)
        })
      }
    }) 
  })

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
        console.log(result)
        if (result) {
          setUserAuth(true)
        }
        const name = result.user.displayName
        const email = result.user.email
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
        }
    }).catch((error)=> {
        console.log(error.message)
    })
  }
  const logoutUser = () => {
    signOut(auth).then(() => {
        console.log('SIGN OUT SUCCESS')
        setUserAuth(false)
    }).catch((error) => {
        console.log(error)
    })
}


  // const {loading, error, user} = useUserContext()
  return (
    <div className="App">
      <h1>GOAL MASTER</h1>
      {userAuth ? (
        <MainPage logoutUser={logoutUser}/>
      ) : ( 
      <div className = 'container'>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
        <button className='login-with-facebook' onClick={signInWithFacebook}>Sign in with Facebook</button>
        <button className='login-with-github' onClick={signInWithGitHub}>Sign in with GitHub </button>
      {/* {error && <p className='error'>{error}</p>}
      {loading ? <h2>Loading....</h2> : <>{user ? <MainPage goals={goals} setGoals={setGoals}/>} */}
    </div>
    )}
    </div>
  );
}

export default App;
