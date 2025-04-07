import React,  {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken, deleteNotes } from '../utils/apiCalls';
import { formatDate } from '../utils/miscMethods';
const EditNote = () => {
    const token = getToken();
    const location = useLocation(); 
    const [note] = useState(location.state.data)
    const [editedNote, setEditedNote] = useState(note); 
    const navigate = useNavigate();

    const handelContentChange = (event) => {
        const field = event.target.getAttribute('data-field'); 
        const newContent = event.target.textContent; 

        if(field === 'title'){
            setEditedNote(prevNote => ({...prevNote, title: newContent}))
        } else if (field === 'content') {
            setEditedNote(prevNote => ({...prevNote, content: newContent}))
        }

    }
    console.log('Notes id: ', note._id)
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/notes/${note._id}`, {
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
    const navigatetoHome = () => {
        navigate('/')
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
      <div className='flex justify-center mb-10 gap-4'>
            <button
            className='min-w-1/3 border-2 hover:bg-green-700 hover:text-white px-4 py-4 text-center mt-10 rounded-lg cursor-pointer'
            onClick={handleSave}
            >
                Save
            </button>
            <button
                className="min-w-1/3 border-2 hover:bg-red-700 hover:text-white px-4 py-4 text-center mt-10 rounded-lg cursor-pointer"
                onClick={async () => {
                    await deleteNotes(note._id);
                    navigatetoHome();
                }}
                >
                Delete
            </button>
        </div>
    </>
  )
}

export default EditNote