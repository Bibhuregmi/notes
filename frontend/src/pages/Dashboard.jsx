import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { getUserName, fetchNotes } from '../utils/apiCalls';
import {FaPencilAlt} from 'react-icons/fa'
import { useNavigate } from'react-router-dom'
import { formatDate } from '../utils/miscMethods';
const Dashboard = () => {

  const[notes, setNotes] = useState([]); 
  const[userName, setUserName] = useState(''); 
    
  const {isAuthenticated, token } = useContext(AuthContext)
  
  const navigation = useNavigate()

  const handleEditNote = (note) => {
    navigation('/edit-notes', { state : { data: note }})
  }

  const navigatetoCreate = () => {
    navigation('/create-notes')
  }
  useEffect (() => { 
    if(isAuthenticated){
      const loadData = async () => {
        const userName = await getUserName(); 
        setUserName(userName); 
        const notesdData = await fetchNotes(); 
        setNotes(notesdData);
      }
      loadData(); 
    } 
  }, [isAuthenticated, token]) //anytime the state of the authentication or the token changes, the useEffect runs again. 
  console.log(isAuthenticated, token)

  if(!isAuthenticated){
    return(
      <div className="max-w-full h-[50vh] flex flex-col items-center gap-4 mt-4 px-4 py-4">
        <h1 className="text-8xl font-bold mb-10">Welcome to Notes.</h1>
        <p className="text-lg italic">
          Only the registered users can interact with the notes
        </p>
        <h3>Sign In with your existing account or Register to create new Account.</h3>
      </div>
    )
  }

  return (
      <>
        <div className="sm:text-2xl md:text-6xl lg:text-8xl text-center mt-10 mb-10 h-[60vh] flex flex-col justify-center items-center bg-black text-white">
          Welcome to Notes <br />
          <span className="font-semibold">{userName}</span>
        </div>
        <div className="w-full h-full mt-15 px-4 py-4 justify-center flex flex-col items-center">
          <button className="px-4 py-4 border-2 mb-10 mt-6 text-2xl hover:bg-black hover:text-white rounded-lg cursor-pointer"
              onClick={() => navigatetoCreate()}
          >
            <div className="flex items-center justify-center gap-3 sm:text-base md:text-xl lg:text-3xl">
              <FaPencilAlt />
              Create new Note
            </div>
          </button>
        </div>
          <>
            <h2 className="sm:text-base md:text-4xl lg:text-6xl mb-6 text-center">All notes</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 px-2 py-2 h-full w-full place-items-center">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="px-4 py-4 rounded-lg h-[350px] w-[75%] bg-yellow-200 hover:scale-105 shadow-lg mt-4 cursor-pointer text-left"
                  onClick={() => {handleEditNote(note)}}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="h-[80%] overflow-hidden">
                      <h3 className="text-5xl font-bold mb-6">{note.content.length > 30 ? `${note.content.slice(0,30)}...` : note.content}</h3>
                      <p>{note.content.length > 100 ? `${note.content.slice(0,100)}...` : note.content}</p>
                    </div>
                      <p className='text-xs text-gray-700 font-bold'>{formatDate(note.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
      </>
  )
}

export default Dashboard