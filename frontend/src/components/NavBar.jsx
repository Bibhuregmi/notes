import React, { useState } from 'react'
import {FaSignInAlt, FaUser, FaSignOutAlt} from "react-icons/fa"
import { Link, useNavigation } from 'react-router-dom'
import LoginPopup from './LoginInPopup'
const NavBar = () => {
    const[showpopup, setShowpopup] = useState(false);
    const navigate = useNavigation();

    const isAuthenticated = localStorage.getItem('authToken') ? true : false; 
    const openPopup = () => setShowpopup(true);
    const closePopup = () => setShowpopup(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        closePopup();
        navigate('/')
    }

  return (
    <div className='w-full flex px-10 py-4 justify-between'>
        <div className='text-5xl font-semibold cursor-pointer'>
            <Link
                to='/'
            > Notes </Link>
        </div>

        <div className='flex w-3xs justify-between p-2'>
                {!isAuthenticated ? (
                    <>
                        <div className='flex items-center hover:scale-105 hover:bg-black hover:text-white px-4 py-4 rounded-lg'>
                            <Link className='flex items-center gap-2 hover:scale-105'
                            to = '/login'
                            >
                            <FaSignInAlt/>Sign In
                            </Link>
                        </div>
                        <div className='flex items-center hover:scale-105 hover:bg-black hover:text-white px-4 py-4 rounded-lg'>
                            <Link className='flex items-center gap-2 hover:scale-105'
                                to = '/register'
                                >
                                <FaUser/>Register
                            </Link>
                        </div>
                    </>
                    
                ): (
                    <button className='flex items-center gap-2 hover:scale-105 hover:bg-black hover:text-white px-4 py-4 rounded-lg cursor-pointer'
                    onClick={openPopup}
                    >
                    <FaSignOutAlt/>SignOut                
                    </button>
                )} 
            <LoginPopup
                show={showpopup}
                onClose={closePopup}
                onLogout={handleLogout}
            />
        </div>
    </div>
  )
}

export default NavBar