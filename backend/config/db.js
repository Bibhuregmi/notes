import mongoose from "mongoose"; //mongoose provide structure, validatation and help on creating user-friendly API while working with MongoDB`

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connect with ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}