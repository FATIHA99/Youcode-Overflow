import React from 'react'
import '../components/style.css'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
 
}
    from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Outlet } from 'react-router-dom'

function Login() {
    return (
        <MDBContainer fluid style={{position:'fixed'}}>
            <MDBRow>
                <Outlet />
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://laquotidienne.ma/uploads/actualites/5bec3b950498f.jpg"
                        alt="Login" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', height: '100vh', backgroundColor: 'black' }} />
                </MDBCol>

            </MDBRow>
        </MDBContainer>
    )
}
export default Login