import React from 'react'
import {FaSignInAlt, FaUser} from "react-icons/fa"
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='w-full flex px-10 py-4 justify-between'>
        <div className='text-5xl font-semibold cursor-pointer'>
            <Link
                to='/'
            > Notes </Link>
        </div>

        <div className='flex w-3xs justify-between p-2'>
            <div className='flex items-center'>
                <Link className='flex items-center gap-2'
                    to = '/login'
                >
                    <FaSignInAlt/>Sign in
                </Link>
            </div>
            <div>
                <Link className='flex items-center gap-2'
                    to = '/register'
                >
                    <FaUser/>Register
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar