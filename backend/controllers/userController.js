import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


// @desc Register New user
// @route POST api/users
export const registerUser = expressAsyncHandler(async (req, res) =>{
    const {name, email, password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please include all of the field')
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('This user already exists! Proceed to login')
    }

    //hasing the password using bcrypt
    const salt = await bcrypt.genSalt(10); //before creating hash, creating the salt cause it ensures that even in the case of same passwords of two different users, it ensures that the hash is differnet. 
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating the new user in DB
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// @desc Login the user 
// @route POST api/users/login
export const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body; 
    
    const user = await User.findOne({email})
    //authenticaing the user 
    if(user && (await bcrypt.compare(password, user.password))){ //need to use bcrypt to compare cause, db stores hashed password and needs to unhash before comparision
        res.status(200).json({
            _id: user.id,
            username: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
// @desc GET info of the current logged in user
// @route GET api/users/me
export const getUser =  expressAsyncHandler(async (req, res) => {
    const {id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: req.user.id,
        name,
        email
    })
})


//JWT Token, is like a keycard once authenticated, provided by the server to the client for the future reference. When making future requests, the client includes this token so the server can verify the identity without needing login details again. If the token is valid and not expired, access is granted. this reduces the overhead of storing session details on the server and the database. 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}