import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import itrouter from './routes/itroute.js';
<<<<<<< HEAD

=======
import userrouter from './routes/userroute.js';
import 'dotenv/config';
>>>>>>> debd50c82f6e4536f242c84b371216b145e24cc7
const app=express();
const port =3500;
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/it',itrouter);
app.use('/images',express.static('uploads'))
<<<<<<< HEAD

app.get("/",(req,res)=>{
    res.send("api working")
});
=======
app.use('/api/user',userrouter);

>>>>>>> debd50c82f6e4536f242c84b371216b145e24cc7
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
});

