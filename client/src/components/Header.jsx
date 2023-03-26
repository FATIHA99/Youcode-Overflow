import React from 'react'
import './css/Header.css'
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { MDBBtn } from 'mdb-react-ui-kit';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios' 
import {toast, ToastContainer} from 'react-toastify'

function Header(props) {
    const API_URL ='http://localhost:8080'
 const navigate  =  useNavigate()

    const logout = () => {
        axios.get(`${API_URL}/auth/signout`)
            .then(() => {
                toast.success('Logout succefully !')

                localStorage.removeItem('jwt_info')
                localStorage.removeItem('ID')
                localStorage.removeItem('USERNAME')
                navigate('/')
            })
            .catch()
    }
    return (

        <header>
            <ToastContainer/>
            <div className='header-container'>
                <div className='header-left'>
                    <Link to={'/questions'} className='header-left' >
                        <img className='logo' src={Logo}
                            alt='logo' /></Link>
                    <form action="/add_questions"><MDBBtn outline >Add Question</MDBBtn></form>

                </div>
                <div className='header-middle'>
                    <div className='header-search-container'>
                        <SearchIcon />
                        <input type='text' placeholder='Search ...' />

                    </div>
                </div>
                <div className='header-right'>
                    <div className='header-right-container'>
                        <span style={{display: 'flex', }}>
                            <Avatar />
                            <h3 style={{margin:6 ,  textTransform: 'uppercase' , fontSize:'bold' }}> {props.username.replace(/"/g, '')}</h3>
                        </span>
  
                        <Link onClick={logout} className='header-left ms-5' >
                        <LogoutIcon/>
                            </Link>
                  
                    </div>

                </div>

            </div>
        </header>
    )

}
export default Header;