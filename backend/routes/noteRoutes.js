import express from 'express'; 
import { getNotes, updateNotes, createNotes, deleteNotes } from '../controllers/noteController.js';
const router = express.Router(); 

//get request
router.get('/', getNotes);
//post request
router.post('/', createNotes);
//put request
router.put('/:id', updateNotes);
//delete request
router.delete('/:id', deleteNotes);

export default router;