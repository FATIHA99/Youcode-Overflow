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
import { ToastContainer, toast } from "react-toastify";
import "toastr/build/toastr.css";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Reset from '../assets/login.gif'


function Login() {
  const navigate = useNavigate()
 const API_URL ='http://localhost:8080'
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const submiSignin = e => {

    e.preventDefault();
if(user.email==''|| user.password==''){
  toast.warning('please fill all feilds')
}
else {
  axios.post(`${API_URL}/auth/login`, user)

.then((res) => {

toast.success('Login succefully !')

// localStorage.setItem('jwt_info', JSON.stringify(res.data.user))
localStorage.setItem('USERNAME', JSON.stringify(res.data.user.username))
localStorage.setItem('ID', JSON.stringify(res.data.user._id))
console.log(res.data.user)
// if (res.data.user.role === "admin") {
navigate('/questions')
// }

})
.catch(error => {
if (error.response) {
toast.warning(error.response.data.error, 'Please chek Form !')
}
})
}
    
  }

  return (

    <MDBCol sm='6'>
      <ToastContainer />
   <form onSubmit={submiSignin} >
   
      <div className='d-flex flex-row ps-5 pt-5'>
        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />

        <span className="h1 fw-bold mb-0">YOUCODE OVERFLOW</span>
      </div>
      <img src={Reset}  style={{height:400,width:400,marginLeft:200}}  alt='svg'/>


      <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

        <MDBInput   onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label='Email address' id='email' type='email' size="lg" />
        <MDBInput  onChange={handleChange}  wrapperClass='mb-4 mx-5 w-100' label='Password' id='password' type='password' size="lg" />
        <MDBBtn  onClick={submiSignin} className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Login</MDBBtn>
        <p className="small mb-5 pb-lg-3 ms-5"><Link to="/forgetPassword" class="link-info">Forgot password !</Link></p>
        <p className='ms-5'>Don't have an account? <Link to="/register" class="link-info">Register here</Link></p>

      </div>
      </form>
    </MDBCol>



  )
}

export default Login