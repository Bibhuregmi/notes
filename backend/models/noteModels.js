import mongoose from 'mongoose'; 

//creating a schema of the MongoDB, schema is a blueprint that defines how our document is structured in the database. 
const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        maxlength: 45
    },
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date, 
        default: Date.now, 
    }
})
//cerating and exporting the model of the database. Model is a compiled version of the schema that provides methods to interact with the database. 
export const Note = mongoose.model('Note', noteSchema); 