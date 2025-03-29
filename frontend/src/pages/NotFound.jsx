import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className = 'flex flex-col items-center w-auto px-4 py-4 text-center'>
        <FaExclamationTriangle className='text-8xl mb-10'/>
        <h2 className='text-5xl font-bold mb-20'>404 Page not found</h2>
        <Link
            className='px-4 py-4 border-2 mb-10 mt-6 text-2xl hover:bg-black hover:text-white rounded-lg sm:w-1 md:w-1/2 lg:w-1/3 cursor-pointer'
            to = '/'
        >
            Return Home
        </Link>
    </div>

  )
}

export default NotFound