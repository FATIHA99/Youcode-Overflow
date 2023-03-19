import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import Google from '../../assets/Google.png'
import { auth, provider } from "../../firebase";
// import { useHistory } from "react-router-dom"
import './index.css'
import { useNavigate } from 'react-router-dom'


function Index() {


  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res)
      })
  }

  const handleRegister = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   if (email === '' || password === '' || username === '') {
  //     setError('fill all fields');
  //     setLoading(false);
  //   }
  //   else {
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then((res) => {
  //         setLoading(false)
  //         navigate('/');
  //         console.log(res)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         setError(error.message)
  //         setLoading(false)
  //       })
  //   }
  }


  const handleSignIn = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   if (email === '' || password === '') {
  //     setError('fill the feild')
  //     setLoading(false);
  //   }
  //   else {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((res) => {
  //         console.log(res);
  //         setLoading(false)
  //       })
  //       .catch((error) => {
  //         console.log(error.code);
  //         setError(error.message)
  //         setLoading(false)
  //       })
  //   }
  }


  return (

    <div className='auth' id="large-header" >
      <div className='auth-container'>

        <div className='sign-options'>
          {/* google sign iN */}
          <div onClick={handleGoogleSignIN} className='single-option'>
            <img src={Google} alt='google' />
            <p> Login with Google</p>
          </div>

        </div>
        <div className='auth-login'>
          <div className='auth-login-container'>

            {
              register ? (

                <>
                  <div className='input-field'>
                    <p> Username</p>
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type='text' />
                  </div>
                  <div className='input-field'>
                    <p>Email</p>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' />
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='text' />
                  </div>
                  <button onClick={handleRegister} style={{ marginTop: "20px" }}>
                    {loading ? "loading register ..." : 'register'}
                  </button>
                </>


              ) : (

                <>

                  <div className='input-field'>
                    <p>Email</p>
                    <input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                      }}
                      type='email' />
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }} type='text' />
                  </div>
                  <button onClick={handleSignIn}
                    disabled={loading}
                    style={{ marginTop: "20px" }}>
                    {loading ? 'loading ...' : 'sign in'}
                  </button>
                </>
              )}
               {/* onClick={() => { setRegister(!register) }} */}
            <p
              style=
              {{ marginTop: "10px", textAlign: 'center', color: 'blue', textDecoration: "underline" }}> {
                register ? 'login' : 'register'}?
            </p>

          </div>
        </div>
        {
          error !== "" && (<p style={{
            color: 'red',
            fontSize: "15px"
          }}> {error}</p>)
        }
      </div>
    </div>
  )
}

export default Index