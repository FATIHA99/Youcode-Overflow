import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import Google from '../../assets/Google.png'
import { auth, provider } from "../../firebase";
// import { useHistory } from "react-router-dom"
import './index.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { API_URL } from '../../../config';



function RegisterForm() {

  const API_URL = "http://localhost:8080"
  // const [register, setRegister] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState("");

  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleChange = (e) => {

    setUser({ ...user, [e.target.id]: e.target.value })
    console.log(user)

  }


  const handleSignUp = (e)=> {
    e.preventDefault();
    // toast.success('Creteded succefully chek your email to verfy your a compte!')

    axios.post(`${API_URL}/auth/register`, user)

      .then(() => {
        toast.success('Creteded succefully chek your email to verfy your a compte!')
        // navigate('/')
      })
      .catch((error) => {
        if (error.response) {
          toast.warning(error.response.data.error, 'Please chek Form !')
        }

      })

  }


  // const handleGoogleSignIN = () => {
  //   // setLoading(true);
  //   signInWithPopup(auth, provider)
  //     .then((res) => {
  //       console.log(res)
  //     })
  // }

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


  // const handleSignIn = (e) => {
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
  // }


  return (

    <div className='auth' id="large-header" >
      <ToastContainer />
      <div className='auth-container'>

        {/* <div className='sign-options'>
    
          <div onClick={handleGoogleSignIN} className='single-option'>
            <img src={Google} alt='google' />
            <p> Login with Google</p>
          </div>

        </div> */}


        <div className='auth-login'>
          <div className='auth-login-container'>



            <form onSubmit={handleSignUp}>
              <div className='input-field'>
                <p> Username</p>
                <input id='username' onChange={handleChange} type='text' />
              </div>
              <div className='input-field'>
                <p>Email</p>
                <input id='email' onChange={handleChange} type='email' />
              </div>
              <div className='input-field'>
                <p>Password</p>
                <input id='password' onChange={handleChange} type='text' />
              </div>
              <input type='submit' style={{ marginTop: "20px" }} />
            </form>




            {/* onClick={() => { setRegister(!register) }} */}
            {/* <p
              style=
              {{ marginTop: "10px", textAlign: 'center', color: 'blue', textDecoration: "underline" }}> {
                register ? 'login' : 'register'}?
            </p> */}

          </div>
        </div>

        {/* {
          error !== "" && (<p style={{
            color: 'red',
            fontSize: "15px"
          }}> {error}</p>)
        } */}
      </div>
    </div>
  )
}

export default RegisterForm