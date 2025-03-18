import express from 'express'; 
import dotenv from 'dotenv/config'; //looks for the .env file and loads it automatically. 
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './config/db.js';
import routes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
const port = process.env.PORT
const app = express(); 

connectDb(); 

//this will allow all origins to make request to the backend server
app.use(cors({
    origin: 'http://localhost:5000', //url of the frontend server
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));
//using the middleware that parses the input body request
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//specifing the url and the router 
app.use("/api/notes", routes);
app.use('/api/users', userRoutes); 
//using the custom error handler 
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})