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
// import { API_URL } from '../../config';


const LoginForm = () => {
    // <ToastContainer />
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

       

      <form >

<div className='input-field'>
  <p>Email</p>
  <input
   
    type='email'
    id='email' />
</div>
<div className='input-field'>
  <p>Password</p>
  <input 
  type='text' />
</div>
<button  style={{ marginTop: "20px" }}> login
</button>
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

export default LoginForm