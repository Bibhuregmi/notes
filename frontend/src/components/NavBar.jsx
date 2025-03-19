import React, { useContext, useState } from 'react'
import {FaSignInAlt, FaUser, FaSignOutAlt} from "react-icons/fa"
import { Link } from 'react-router-dom'
import LoginPopup from './LoginInPopup'
import { AuthContext } from '../context/AuthContext'
const NavBar = () => {
    const[showpopup, setShowpopup] = useState(false);

    const openPopup = () => setShowpopup(true);
    const closePopup = () => setShowpopup(false);

    const {isAuthenticated, logout} = useContext(AuthContext);
    const handleLogout = () => {
        console.log('Handle Logout')
        logout();
        closePopup();
    }
  return (
    <div className='w-full flex px-10 py-4 justify-between'>
        <div className='sm:text-xs md:text-xl lg:text-5xl font-semibold cursor-pointer px-3 py-3'>
            <Link
                to='/'
            > Notes </Link>
        </div>

        <div className='flex w-3xs justify-between p-2 sm:text-xs md:text-base lg:text-base'>
                {!isAuthenticated ? (
                    <>
                        <div className='flex items-center hover:scale-105 hover:bg-black hover:text-white px-4 py-4 rounded-lg'>
                            <Link className='flex items-center gap-2 hover:scale-105'
                            to = '/login'
                            >
                            <FaSignInAlt/>SignIn
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
                onLogout={handleLogout}
                onClose={closePopup}
            />
        </div>
    </div>
  )
}

export default NavBar