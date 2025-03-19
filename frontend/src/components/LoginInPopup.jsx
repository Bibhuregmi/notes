import React from 'react'
const LoginPopup = ({show, onLogout, onClose}) => {
    
    if(!show) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-[50vw] h-[50vh] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6'>
            <p className='text-7xl font-bold mb-6 text-center text-black'>Are you sure you want to logout?</p>
            <div className="flex justify-around w-full">
                <button
                    className="border-2 w-1/3 hover:bg-black hover:text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={onLogout}
                >
                    Yes
                </button>
                <button
                    className="border-2 w-1/3 hover:bg-black hover:text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={onClose}
                >
                    No
                </button>
            </div>
        </div>
    </div>
  )
}

export default LoginPopup