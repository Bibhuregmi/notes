import expressAsyncHandler from "express-async-handler" //using this so that we can keep code modular and no need to use try catch block and next to handle error
import { Note } from "../models/noteModels.js"
// @desc : GET all the notes of the user
// @route : GET api/notes
export const getNotes = expressAsyncHandler(async (req, res) => {
    const note = await Note.find(); 
    res.status(200).json(note)
})
// @desc : Create new note for the user
// @route : POST api/notes
export const createNotes = expressAsyncHandler(async (req, res) => {
    const { title, content} = req.body; //specifing what will a request body contains

    if (!title || !content){
        res.status(400)
        throw new Error('Plese include title and the content for the note')
    }
    const newNote = await Note.create({ //this creates the new field in the database 
        title: req.body.title,
        content: req.body.content
    }); 
    
    res.status(200).json(newNote);
})
// @desc : Update the notes of the user
// @route : PUT api/notes/:id
export const updateNotes = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;   
    const newTitle = req.body.title;
    const newContent = req.body.content; 

    const note = await Note.findById(id); //extracting the id from the response 
    if(!note){
        res.status(400)
        throw new Error('Invalid Id!')
    }
    const updatedNote = await Note.findByIdAndUpdate(id,
                                                    {title: newTitle,
                                                    content: newContent}, {new : true} ) 
    console.log(req.body);
    res.status(200).json(updatedNote)
})
// @desc : Delete note of the user
// @route : DELETE api/notes/:id
export const deleteNotes = expressAsyncHandler(async (req, res) => {
    const id = req.params.id; 
    const note = await Note.findById(id); 
    if(!note){
        res.status(400)
        throw new Error("Invalid id!")
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({'Deleted note id': id})
})