import express from 'express';
import { registeruser} from '../controllers/usercontroller.js';



const userrouter=express.Router();

userrouter.post('/register',registeruser);
userrouter.post('/login',);



export default userrouter;