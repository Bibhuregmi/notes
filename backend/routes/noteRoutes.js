import express from 'express'; 

const router = express.Router(); 

//get request
router.get('/', (req, res) => {
    res.status(200).json({message : 'Get notes'});
})
//post request
router.post('/', (req, res) => {
    res.status(200).json({message : 'Create note'});
})
//put request
router.put('/:id', (req, res) => {
    res.status(200).json({message : 'Update note'});
})
//delete request
router.delete('/:id', (req, res) => {
    res.status(200).json({message : 'Delete note'});
})

export default router;