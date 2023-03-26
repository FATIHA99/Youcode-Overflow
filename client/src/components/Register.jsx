import React, { useState } from 'react'
import './style.css'
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import Youcode from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import AddUser from '../assets/AddUser.gif'

function Register() {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080'

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleChange = (e) => {

    setUser({ ...user, [e.target.id]: e.target.value })

  }
  const submiSignup = e => {
    e.preventDefault();
    if (user.username == '' || user.email == '' || user.password == '') {
      toast.warning('please fill all fields ')
    }else{
      if(user.password.length<5){
        toast.warning('password most be greater than 5 char')
      }
      else{
          axios.post(`${API_URL}/auth/register`, user)

      .then(() => {
        toast.success('Creteded succefully chek your email to verfy your a compte!')
        // navigate('/auth/login')
      })
      .catch((error) => {
        if (error.response) {
          toast.warning(error.response.data.error, 'Please chek Form !')
        }

      })
      }
    
    }
    

  }
  return (

    <MDBCol sm='6'>
      <ToastContainer />
      <div className='d-flex flex-row ps-5 pt-5'>
        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
        <span className="h1 fw-bold mb-0">YOUCODE OVERFLOW</span>
      </div>
      <img src={AddUser} style={{ height: 400, width: 400, marginLeft: 200 }} alt='svg' />

      <div className='d-flex flex-column  h-custom-2 w-75 '>

        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Sign up </h3>

        <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label='Username' id='username' type='text' size="lg" />
        <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label='Email address' id='email' type='email' size="lg" />
        <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label='Password' id='password' type='password' size="lg" />
        <MDBBtn onClick={submiSignup} className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Create Account</MDBBtn>
        <p className="small pb-lg-3 ms-5"><Link to="/forgetPassword" class="link-info">Forgot password !</Link></p>
        <p className='ms-5'>Don't have an account? <Link to="/" class="link-info">Login here</Link></p>

      </div>

    </MDBCol>



  )
}

export default Register