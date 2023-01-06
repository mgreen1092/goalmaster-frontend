import './App.css';
import MainPage from './Components/MainPage/MainPage.js';
import { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup  } from 'firebase/auth'
import axios from 'axios'

function App() {
  const [userAuth, setUserAuth] = useState(false || window.localStorage.getItem('auth')==='true')
  const [user, setUser] = useState()
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [quote, setQuote] = useState('')
  // const [loggingIn, setLoggingIn] = useState('')
  const googleProvider=new GoogleAuthProvider()
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        setUserAuth(true)
        window.localStorage.setItem('auth', 'true')
        response.getIdToken().then((token) => {
          setToken(token)
        })
      }
    }) 
  })

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
          sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
          sessionStorage.setItem('ID Token', result._tokenResponse.idToken)
          const header = { headers: { authorization: `bearer ${sessionStorage.getItem('ID Token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'} }
          fetch(`https://goalmaster.herokuapp.com/api/users/${result.user.email}`, header)
          .then((response) => {
            if (!response.ok) {
              fetch('https://goalmaster.herokuapp.com/api/users/', {
                headers: { 'authorization': `bearer ${sessionStorage.getItem('ID Token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
              method: "POST",
              body: JSON.stringify({
                email: result.user.email,
                goals: []
          })}).then((response) => {
            console.log(response)
          })
            }
          }).catch((err) => {
          console.log(err)
          })
        const name = result.user.displayName
        const email = result.user.email
        setName(name)
        setUser(email)
        const profilePic = result.user.photoURL

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', profilePic)

    }).catch((error) => {
        console.log(error)
    });
  }
  const logoutUser = () => {
    signOut(auth).then(() => {
        setUserAuth(false)
        setUser('')
    }).catch((error) => {
        console.log(error)
    })
  }
  // useEffect (() => {
  //   getQuote()
  // })
  // const getQuote = async () => {
  //   let quote = await axios('https://api.api-ninjas.com/v1/quotes?category=success', {
  //     headers: {
  //       'X-Api-Key': 'cEW3Z5q4mXVaw+Ug2wePzA==ZG7oA3iNZQdv8Ggo'
  //     }
  //   })
  //   setQuote(quote.data[0].quote)
  // }
  return (
    <div className="Nav">
      {userAuth ? (
        <MainPage logoutUser={logoutUser} setUser={setUser} user={user} name={name} token={token} quote={quote}/>
      ) : ( 
      <div>
      <div className="App">
        <h1 className='title'>GOAL MASTER</h1>
        <div className = 'container'>
          <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
    <div className='page'> 
        <img alt='SMART Goals' className='image' src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_537586633_360886.jpg" />
    </div>
    </div>
    )}
    </div>
  );
}

export default App;
