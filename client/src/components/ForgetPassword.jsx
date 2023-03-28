import React, { useState } from 'react';
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
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import ForgotPassword from '../assets/ForgotPassword.gif';
 function ForgetPassword() {
  const navigate = useNavigate()
  const API_URL = 'http://localhost:8080'

  const [user, setUser] = useState({
    email: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const onSubmit = (e) => {

    e.preventDefault();
    if(user.email==''){
      toast.warning(' fill the email feild')
    }
    else{
      axios.post(`${API_URL}/auth/forgetpassword`, user)
      .then((res) => {
        toast.success("We've sent you an email with a link to update your password.")
        localStorage.setItem('jwt_FORG', JSON.stringify(res))
        navigate('/')

      })
      .catch((error) => {
        if (error.response) {
          toast.warning(error.response.data.error, 'Please chek Form !')
        }
      })
    }
    
  }

  return (

    <MDBCol sm='6'>
      <ToastContainer />
      <div className='d-flex flex-row ps-5 pt-5'>
        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
        <span className="h1 fw-bold mb-0">YOUCODE OVERFLOW</span>
      </div>
      <img src={ForgotPassword} style={{ height: 400, width: 400, marginLeft: 200 }} alt='svg' />

      <div className='d-flex flex-column  h-custom-2 w-75 '>

        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}> Forget Password  </h3>
        <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label='Email adress' id='email' type='email' size="lg" />
        <MDBBtn onClick={onSubmit} className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Send</MDBBtn>
        <p className='ms-5'>you have an account? <Link to="/" class="link-info">Login here</Link></p>
        <p className='ms-5'>Don't have an account? <Link to="/register" class="link-info">Sign up  here</Link></p>

      </div>

    </MDBCol>



  )
}

export default ForgetPassword