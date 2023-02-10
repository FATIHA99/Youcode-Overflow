import React from 'react'
import './css/Header.css'
import InboxIcon from '@mui/icons-material/Inbox';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/icons-material/InsertComment';
import {Avatar} from '@mui/material'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <div className='header-container'>
                <div className='header-left'>
                    <Link to={'/'} className='header-left' >  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Stack_Overflow_logo.png"
                        alt='logo' /></Link>
                   
                       
                    <h3>Products</h3>
                </div>
                <div className='header-middle'>
                    <div className='header-search-container'>
                        <SearchIcon />
                        <input type='text' placeholder='Search ...' />
                    </div>
                </div>
                <div className='header-right'>
                    <div className='header-right-container'>
                        <Avatar />
                        <InboxIcon />
                        <List/>
                    </div>

                </div>

            </div>
        </header>
    )

}
export default Header;