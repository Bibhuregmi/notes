import React,  {useState} from 'react'
import { useLocation } from 'react-router-dom'
import { getToken } from '../utils/apiCalls';
import { formatDate } from '../utils/miscMethods';
const EditNote = () => {
    const token = getToken();
    const location = useLocation(); 
    const [note] = useState(location.state.data)
    const [editedNote, setEditedNote] = useState(note); 

    const handelContentChange = (event) => {
        const field = event.target.getAttribute('data-field'); 
        const newContent = event.target.textContent; 

        if(field === 'title'){
            setEditedNote(prevNote => ({...prevNote, title: newContent}))
        } else if (field === 'content') {
            setEditedNote(prevNote => ({...prevNote, content: newContent}))
        }

        console.log(`New ${field} changed: `, newContent)
        console.log('Initial editedNote state:', editedNote);
    }
    console.log('Notes id: ', note._id)
    const handleSave = async () => {
        console.log('editedNote state before save:', editedNote);
        try {
            const res = await fetch(`http://localhost:8000/api/notes/${note._id}`, {
                method : 'PATCH', 
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}` 
                }, 
                body : JSON.stringify(editedNote)
            })
            if(!res.ok){
                console.error(`Changes not made ${res.status} error`)
            }
        } catch (error) {
            console.error('Error on the patch method', error)
        }
    }
  return (

    <>
    <div className='flex flex-col items-center h-screen rounded-lg px-4 py-4  bg-yellow-200 shadow-lg'>
        <p className='text-base'>
        {formatDate(note.createdAt)}
        </p>
        <div
            contentEditable={true}
            onBlur={handelContentChange}
            className='px-4 py-4 lg:text-5xl md:text-3xl sm:text-lg min-h-[15%] font-bold min-w-full flex justify-between'
            data-field='title'
        >
            {note.title}
        </div>
          <div
              contentEditable={true}
              onBlur={handelContentChange}
              className='px-4 py-4 lg:text-3xl md:text-lg sm:text-md min-h-[67%] min-w-full'
              data-field='content'
          >
              {note.content}
          </div>
      </div>
      <div className='flex justify-center mb-10'>
            <button
            className='min-w-1/2 border-2 hover:bg-black hover:text-white px-4 py-4 text-center mt-10 rounded-lg cursor-pointer'
            onClick={handleSave}
            >
                Save
            </button>
        </div>
    </>
  )
}

export default EditNote