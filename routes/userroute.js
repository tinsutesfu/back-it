import express from 'express';
import { registeruser} from '../controllers/usercontroller.js';



const userrouter=express.Router();

userrouter.get('/register',registeruser);
userrouter.post('/login',registeruser);



export default userrouter;