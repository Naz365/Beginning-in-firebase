import './App.css';
import initAuthentication from './Firebase/Firebase.initialize';
import { getAuth, signInWithPopup,GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';


initAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
function App() {
    const [user, setUser] = useState({})

    const auth = getAuth();
  const handleGoogleSingIn = () => {
    
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email, photoURL}= result.user;
      const loggedInUser = {
        Name: displayName,
        Email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    
      console.log(loggedInUser);
    })
      .catch(error => {
        console.log(error.message);
      })
  }
const handleGithubSingIn = () =>{
signInWithPopup(auth,githubProvider)
.then(result =>{
  const {displayName, email, photoURL}= result.user;
  const loggedInUser = {
    name: displayName,
    email: email,
    photo: photoURL
  };
  setUser(loggedInUser);
})
}
const handleSignOut = () =>{
  signOut(auth).then(() =>{
    setUser({});
  })
}

  return (
    <div className="App">
      {!user.name ?
      <div>
        <button onClick= {handleGoogleSingIn}>Google Sing In</button>
      <button onClick= {handleGithubSingIn }>Github Sing In</button>
      </div>
      :
      <button onClick={handleSignOut}>Sing Out</button>}
      <br />

      {
      user.name && <div>
        <h2>Hi! {user.name}</h2>
        <p>Is it your mail? {user.email} </p>
        <img src={user.photo} alt="" />
      </div>
      }
    </div>
  );
}

export default App;
