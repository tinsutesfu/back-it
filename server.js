import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import itrouter from './routes/itroute.js';
import userrouter from './routes/userroute.js';
import 'dotenv/config';
import cartrouter from './routes/cartrouter.js';
import orderrouter from './routes/orderroute.js';
const app=express();
const port =process.env.PORT || 3500;
app.use(express.json());

const corsOptions = {
  origin: 'https://front-it-solution.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


connectDB();

app.use('/api/it',itrouter);
app.use('/images',express.static('uploads'))
app.use('/api/user',userrouter);
app.use('/api/cart',cartrouter);
app.use('/api/place',orderrouter);

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
});
