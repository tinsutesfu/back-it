import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import itrouter from './routes/itroute.js';

const app=express();
const port =3500;
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/it',itrouter);
app.use('/images',express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("api working")
});
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
});

