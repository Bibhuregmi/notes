import express from 'express'
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
const userRoutes = express.Router(); 

userRoutes.post('/', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me', getUser)


export default userRoutes; 