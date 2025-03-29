import express from 'express'; 
import { getNotes, updateNotes, createNotes, deleteNotes } from '../controllers/noteController.js';
import {protect} from '../middlewares/authMiddleware.js'
const router = express.Router(); 

//get request
router.get('/', protect, getNotes);
//post request
router.post('/', protect, createNotes);
//put request
router.patch('/:id', protect, updateNotes);
//delete request
router.delete('/:id', protect, deleteNotes);

export default router;