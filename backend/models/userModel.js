import mongoose from "mongoose";

const user = mongoose.Schema({
    name: {
        type: String, 
        reqired: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,  
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', user); 

export default User; 