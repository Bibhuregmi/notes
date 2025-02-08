import express from 'express'
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router(); 

userRoutes.post('/', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me', protect, getUser)

export default userRoutes; 