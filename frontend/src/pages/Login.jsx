import React, {useState, useContext} from 'react'
import {FaEnvelope, FaLock} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
const Login = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState(''); 
  const navigate = useNavigate(); 
  const { login }= useContext(AuthContext)

  const userData = {email, password}; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      const data = await res.json(); 
      console.log(data);
      if(!res.ok){
        throw new Error( data.error || 'Invalid Email or Password')
      }

      login(data.token);
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  }
  return (
      <div className = 'mx-4 my-4 h-[85vh] flex  justify-center px-2 py-2'>
        <div className = 'lg:h-full lg:max-w-1/2 border-2 rounded-lg shadow-lg bg-[#121212] text-white px-6 py-6 sm:w-full sm:h-auto'>
          <div className = 'text-center max-w-full mb-14'>
            <h3 className='sm:text-2xl md:text-4xl lg:text-6xl font-bold'>Welcome to Note.</h3>
            <p className='sm:text-sm md:text-lg lg:text-xl font-light'>Login to your account</p>
            
          </div>
            <form onSubmit={handleSubmit}>
              <div className='relative mb-10'>
                <input 
                  type='email' 
                  name = 'email'
                  value = {email}
                  placeholder = 'Enter your email' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  onChange = {(e) => setEmail(e.target.value)}
                  required
                  >
                  </input>
                <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
              <div className='relative mb-10'>
                <input 
                  type='password' 
                  placeholder = 'Enter your password' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  name = 'password'
                  value={password}
                  onChange = {(e) => setPassword(e.target.value)}
                  required
                  ></input>
                <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
                {error && <p className="text-red-500 text-base mb-2 text-center font-bold">{error}</p>} {/*Showing the error message if there is any*/}
              <div className='flex w-full justify-center border-b-1 py-3 mb-2'>
                <button className='border-2 w-1/2 border-white mb-2 rounded-lg px-2 py-2 justify-center hover:bg-white hover:text-black cursor-pointer'>
                    Sign In
                </button>
              </div>
            </form>
            <div className='flex w-full items-center py-3 flex-col'>
              <p className='sm:text-[0.30rem] md:text-[0.50rem] lg:text-[0.75rem] mb-3'>New to app? Create a new account</p>
              <button className='border-2 w-1/2 border-white rounded-lg px-2 py-2 justify-center hover:bg-white hover:text-black cursor-pointer' onClick={() => navigate('/register')}>
                  Register
              </button>
            </div>
        </div>
      </div>
  )
}

export default Login