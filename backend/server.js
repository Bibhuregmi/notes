import express from 'express'; 
import dotenv from 'dotenv/config'; //looks for the .env file and loads it automatically. 
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './config/db.js';
import routes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'; 
import { fileURLToPath } from 'url';
import path ,{ dirname } from 'path';
let port = process.env.PORT
const app = express(); 


const __fileName = fileURLToPath(import.meta.url); 
const __dirname = dirname(__fileName);
connectDb(); 

//this will allow all origins to make request to the backend server
app.use(cors({
    origin: 'http://localhost:5000', //url of the frontend server
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
}));
//using the middleware that parses the input body request
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api/notes", routes);
app.use('/api/users', userRoutes); 
//specifying the url and the router 
//using the custom error handler 
app.use(errorHandler); 

//Serving the frontend 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    //pointing the other routes to the static file 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'))
    })
}else{
    app.get('/', (req,res) => res.send("Please set to production"))
}


if(port === null || port === ''){
    port = 8000
}

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})