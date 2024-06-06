import express from 'express';
import { registeruser,handlelogin} from '../controllers/usercontroller.js';



const userrouter=express.Router();

userrouter.post('/register',registeruser);
userrouter.post('/login',handlelogin);



export default userrouter;