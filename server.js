import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import itrouter from './routes/itroute.js';
import userrouter from './routes/userroute.js';
import 'dotenv/config';
import cartrouter from './routes/cartrouter.js';
const app=express();
const port =3500;
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/it',itrouter);
app.use('/images',express.static('uploads'))
app.use('/api/user',userrouter);
app.use('/api/cart',cartrouter);

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
});