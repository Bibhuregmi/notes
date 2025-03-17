import React, {useEffect, useState} from 'react'

const Popup = ({message, duration = 3, onClose}) => {
    const [countDown, setCountDown] = useState(duration); 
    useEffect(() => {
        if(countDown > 0){
            const timer = setTimeout(() => {
                setCountDown(countDown -1 )
            }, 1000)
            return () => clearTimeout(timer); 
        }else{
            onClose(); 
        }
    }, [countDown, onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-[50vw] h-[50vh] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6'>
            <p className='text-7xl font-bold mb-6 text-center text-black'>{message}</p>
            <p className="text-xl font-bold text-black">Going to signup in {countDown}...</p>
        </div>
    </div>
  )
}

export default Popup