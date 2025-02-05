import express from 'express'; 
import dotenv from 'dotenv/config'; //looks for the .env file and loads it automatically. 
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/noteRoutes.js'

const port = process.env.PORT
const app = express(); 

//using the middleware that parses the input body request
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//specifing the url and the router 
app.use("/api/notes", routes);
//using the custom error handler 
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})