import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import Reset from '../assets/reset.png'
const ResetPassword = () => {
    const API_URL = 'http://localhost:8080'
    const navigate = useNavigate()
    const isRestpassw = () => {
        const jwt = localStorage.getItem('jwt_FORG')

        if (jwt) {
            return JSON.parse(jwt)
        }
        return false
    }
    const { data } = isRestpassw()
    const token = data.token

    const [user, SetUser] = useState({
        password: '',
        confirmation: ''
    })

    const handleChange = (e) => {

        SetUser({ ...user, [e.target.id]: e.target.value })
    }

    const onSubmit = (e) => {

        e.preventDefault();
        if (user.password != user.confirmation) {
            toast.warning('please confirm your password ')
        }
        else {
            if (user.password.length < 5) {
                toast.warning('password most be greater  than 5 char')
            } else {
                axios.post(`${API_URL}/auth/resetpassword/${token}`, user)
                    .then((res) => {
                        toast.success("We've sent you an email with a link to update your password.")
                        navigate('/')

                    })
                    .catch((error) => {
                        console.log(error)
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
            <form  >

                <div className='d-flex flex-row ps-5 pt-5'>
                    <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />

                    <span className="h1 fw-bold mb-0">YOUCODE OVERFLOW</span>


                </div>
                <img src={Reset} style={{ height: 400, width: 400, marginLeft: 100 }} alt='svg' />

                <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                    <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Reset Password</h3>

                    <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label=' New Password' id='password' type='password' size="lg" />
                    <MDBInput onChange={handleChange} wrapperClass='mb-4 mx-5 w-100' label=' Confirmation' id='confirmation' type='password' size="lg" />
                    <MDBBtn onClick={onSubmit} className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Login</MDBBtn>
                    <p className="small mb-5 pb-lg-3 ms-5"><Link to="/forgetPassword" class="link-info">Forgot password !</Link></p>
                    <p className='ms-5'>Don't have an account? <Link to="/register" class="link-info">Register here</Link></p>

                </div>
            </form>
        </MDBCol>
    )
}


export default ResetPassword