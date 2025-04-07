import React, {useState} from 'react'
import { getToken } from '../utils/apiCalls'
import { useNavigate } from 'react-router-dom'
const CreateNote = () => {
    const[title, setTitle] = useState("")
    const[content, setContent] = useState("")
    const [newNote, setNewNote] = useState({title: title,
                                            content: content})
    const [error, setError] = useState('');
    const token = getToken();
    const navigate = useNavigate();
    const createNotes = async () => {
        try {
            const res = await fetch(`/api/notes/`, {
                method: 'POST', 
                headers : {
                    'Content-Type' :'application/json', 
                    'Authorization' : `Bearer ${token}`
                }, 
                body: JSON.stringify(newNote)
            })
            if(!res.ok){
                setError(console.error(`Changes not made ${res.status} error`))
            }
            navigate('/')
        } catch (error) {
            console.error('Error on the Post method', error)

        }
    }

    const handelContentChange = (event) => {
        const field = event.target.getAttribute('data-field'); 
        const newContent = event.target.textContent

        if(field === 'title'){
            setTitle(newContent)
            setNewNote(prevNote => ({...prevNote, title: newContent}))
        } else if (field === 'content'){
            setContent(newContent)
            setNewNote(prevNote => ({...prevNote, content: newContent}))
        }
    }
  
    return (
<>
    <div className='flex flex-col items-center h-screen rounded-lg px-4 py-4  bg-yellow-200 shadow-lg'>
        <div
            contentEditable = {true}
            onBlur = {handelContentChange}
            data-field = 'title'
            className='px-4 py-4 lg:text-5xl md:text-3xl sm:text-lg min-h-[15%] font-bold min-w-full flex justify-between text-gray-600'
        >
            Title
        </div>
        <div
            contentEditable = {true}
            onBlur = {handelContentChange}
            data-field = 'content'
            className='px-4 py-4 lg:text-3xl md:text-lg sm:text-md min-h-[67%] min-w-full text-gray-500'
        >
            Content
        </div>
    </div>
    <div className='flex justify-center mb-10'>
        <button
        className='min-w-1/2 border-2 hover:bg-black hover:text-white px-4 py-4 text-center mt-10 rounded-lg cursor-pointer'
        onClick={createNotes}
        >
        Save
        </button>
        {error && <p className="text-red-500 text-base mb-2 text-center font-bold">{error}</p>}
    </div>
</>
    )
}

export default CreateNote