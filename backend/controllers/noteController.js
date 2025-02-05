import expressAsyncHandler from "express-async-handler" //using this so that we can keep code modular and no need to use try catch block and next to handle error

// @desc : GET all the notes of the user
// @route : GET api/notes
export const getNotes = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message : 'All notes'})
})
// @desc : Create new note for the user
// @route : POST api/notes
export const createNotes = expressAsyncHandler(async (req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Please include the title for the body')
    }
    res.status(200).json({message : 'Create new notes'})
})
// @desc : Update the notes of the user
// @route : PUT api/notes/:id
export const updateNotes = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message : `Update note of id ${req.params.id}`})
})
// @desc : Delete note of the user
// @route : DELETE api/notes/:id
export const deleteNotes = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message : `Delete note of id ${req.params.id}`})
})