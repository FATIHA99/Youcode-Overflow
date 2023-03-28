import React from 'react'
import Header from '../components/Header'
import SidBar from '../components/sidebar/Sidebar'
import '../pages/css/index.css'
import { Outlet } from 'react-router-dom'


function Home() {

    const username =  localStorage.getItem('USERNAME')
    return (
        <>
            <Header username={username}  />
            <div className='stack-index'>
                <div className='stack-index-content' >
                    <SidBar />
                    <div style={{flex : 'column'}}>
                       <Outlet/>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default Home