import express from 'express'; 
import dotenv from 'dotenv/config'; 
import routes from './routes/noteRoutes.js'

const port = process.env.PORT
const app = express(); 

app.use("/api/notes", routes);

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})