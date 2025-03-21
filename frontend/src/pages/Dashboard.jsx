import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {

  const[notes, setNotes] = useState(''); 
  const[auth, setAuth] = useState(!!localStorage.getItem('authToken')); //checking the auth token upon the component mount
  const token = localStorage.getItem('authToken', auth)
    
  const {isAuthenticated} = useContext(AuthContext)
  useEffect (() => {
    const fetchNotes = async () => {
      try {
        if(isAuthenticated){
          const res = await fetch("http://localhost:8000/api/notes", {
            method: 'GET', 
            headers: {
              'Content-type' : 'application/json',
              'Authorization': `Bearer ${token}` //sending token in the header to get the notes related to the the user only
            },
          })
          const data = await res.json(); 
          console.log(data); 
          if(!res.ok){
            console.error(`Error on Http, ${res.status}`)
          }
        }else{
          throw new Error('User not authenticated! Prompt to login')
        }
      } catch (error) {
        console.error('Error fetching notes', error)
      }
    }
    fetchNotes();
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
    </>
  )
}

export default Dashboard