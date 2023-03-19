import React from 'react'
import './css/Header.css'
import InboxIcon from '@mui/icons-material/Inbox';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/icons-material/InsertComment';
import {Avatar} from '@mui/material'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo2.png'
import {useSelector} from  'react-redux'
import {selectUser} from '../../feature/userSlice'
import {auth}  from '../../firebase'
import {useNavigate} from 'react-router-dom'


function Header() {
    const user =  useSelector(selectUser)

  
      
    return (

        <header>
            <div className='header-container'>
                <div className='header-left'>
                    <Link to={'/'} className='header-left' > 
                     <img  className ='logo' src={Logo}
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
                        <span onClick={()=>{ auth.signOut() }} >
                            <Avatar />
                            {/* src={user.photo}  */}
                            </span>
                     
                            {/* <span onClick={()=>{ console.log(user.photo) }} >
                            <Avatar  /> */}
                            {/* <img src={user.photo} alt={user.displayName} /> */}

                            {/* {user?.photo && <img src={user.photo} alt={user.displayName} />} */}
                            {/* <img src ={(user.photo) ? user.photo :  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjYMdrvVMAKPRZqlN2SkviXv3P2DgWNwiaVg&usqp=CAU'}  alt='vghvghvg'/> */}
                            {/* </span> */}
                        <InboxIcon />
                        <List/>
                        <p> {user?'login':'not logged'}</p>
                    </div>

                </div>

            </div>
        </header>
    )

}
export default Header;