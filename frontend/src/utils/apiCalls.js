const getToken = () => {
    return localStorage.getItem('authToken'); 
}

export const getUserName = async () => {
    const token = getToken(); 
    try {
        const res = await fetch("http://localhost:8000/api/users/me", {
            method: 'GET', 
            headers: {
            'Content-Type' : 'application/json',
            'Authorization' :  `Bearer ${token}`
            }
        })
        const data = await res.json(); 
        if(!res.ok){
            throw new Error(`Error fetching the data ${res.status}`)
        }
    return data.name; 
    } catch (error) {
        console.error('Error fetching the user data', error)
        return null;
    }
} 
export const fetchNotes = async () => {
    const token = getToken(); 
    try {
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
        return data; 
        }catch (error) {
        console.error('Error fetching notes', error)
        return null; 
        }
}

export const deleteNotes = async (noteId) => {
    const token = getToken();
    try{
        const res = await fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type' : 'application/json', 
                'Authorization' : `Bearer ${token}`
            },
        })
        const data = await res.json();
        if(!res.ok){
            console.error(`Error while delete ${res.status}`)
            return null;
        }
        return data; 
    }catch (error){
        console.error('Error deleteing notes', error)
    }
}