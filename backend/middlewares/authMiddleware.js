import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
    const reqHeaderAuth = req.headers.authorization
    let token
    if(reqHeaderAuth && reqHeaderAuth.startsWith('Bearer')){
        try {
            //getting token from the header
            token = reqHeaderAuth.split(' ')[1];
    
            //verifying the 
            const secret = process.env.JWT_SECRET
            const decode = jwt.verify(token, secret); 
    
            req.user = await User.findById(decode.id).select('-password')
        } catch (error) {
            res.status(401)
            throw new Error('Unable to authenticate')
        }
        next();
    }else{
        res.status(401)
        throw new Error('No token avaialble') 
    }
})