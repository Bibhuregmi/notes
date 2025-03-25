import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { getUserName, fetchNotes } from '../utils/apiCalls';

const Dashboard = () => {

  const[notes, setNotes] = useState(''); 
  const[userName, setUserName] = useState(''); 
  const[auth, setAuth] = useState(!!localStorage.getItem('authToken')); //checking the auth token upon the component mount
  const token = localStorage.getItem('authToken', auth)
    
  const {isAuthenticated} = useContext(AuthContext)
  
  useEffect (() => { 
    if(isAuthenticated){
      const loadData = async () => {
        const userName = await getUserName(); 
        setUserName(userName); 
        await fetchNotes(); 
      }
      loadData(); 
    } 
  }, [isAuthenticated, token]) //anytime the state of the authentication or the token changes, the useEffect runs again. 

  return (
    <>
      {!isAuthenticated &&(
        <div className='max-w-full h-[50vh] flex flex-col items-center gap-4 mt-4 px-4 py-4'>
          <h1 className='text-8xl font-bold mb-10'>Welcome to Notes.</h1> 
          <p className='text-lg italic'>Only the registered users can interact with the notes </p>
          <h3>Sign In with your existing account or Register to create new Account.</h3>
        </div>
      )}
      {isAuthenticated && (
        <div>
          {`Welcome to notes ${userName}`} 
        </div>
      )}
    </>
  )
}

export default Dashboard